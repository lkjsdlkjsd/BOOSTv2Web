import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Excalidraw,
  serializeAsJSON,
  loadLibraryFromBlob,
} from "@excalidraw/excalidraw";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import "@excalidraw/excalidraw/index.css";
import { supabase } from "../supabase";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ExcalidrawEditor: React.FC = () => {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI | null>(null);
  const [title, setTitle] = useState("");
  const [isLoadingLibraries, setIsLoadingLibraries] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadLibraries = async () => {
      try {
        const libPaths = [
          "/Draw/architecture-diagram-components.excalidrawlib",
        ];
        const allLibItems = await Promise.all(
          libPaths.map(async (path) => {
            const response = await fetch(path);
            if (!response.ok) {
              throw new Error(
                `Failed to fetch library from ${path}: ${response.status} ${response.statusText}`
              );
            }
            const blob = await response.blob();
            return loadLibraryFromBlob(blob);
          })
        );

        const combinedLibrary = allLibItems.flat();
        excalidrawRef.current?.updateLibrary({
          libraryItems: combinedLibrary,
          merge: true,
        });
      } catch (err) {
        console.error("Failed to load one or more libraries:", err);
        setErrorMessage("Error loading diagram libraries.");
      } finally {
        setIsLoadingLibraries(false);
      }
    };

    loadLibraries();
  }, []);

  const handleSaveTask = useCallback(async () => {
    const api = excalidrawRef.current;
    if (!api) return;

    const elements = api.getSceneElements();
    const appState = api.getAppState();
    const files = api.getFiles();

    const json = serializeAsJSON(elements, appState, files, "local");
    const blob = new Blob([json], { type: "application/json" });

    const safeTitle = title.trim() || "untitled";
    const fileName = `${safeTitle
      .replace(/\s+/g, "-")
      .toLowerCase()}-${Date.now()}.excalidraw`;

    const { data, error } = await supabase.storage
      .from("whiteboards")
      .upload(fileName, blob, {
        contentType: "application/json",
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload failed:", error.message);
      setErrorMessage("Upload failed. Please try again.");
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("whiteboards")
      .getPublicUrl(fileName);

    const downloadURL = publicUrlData?.publicUrl;

    try {
      await addDoc(collection(db, "whiteboards"), {
        title: safeTitle,
        url: downloadURL,
        fileName,
        createdAt: serverTimestamp(),
      });
      alert("Whiteboard saved to Supabase and Firestore!");
      setTitle("");
      setErrorMessage("");
    } catch (err) {
      console.error("Failed to save metadata to Firestore:", err);
      setErrorMessage("Upload succeeded, but saving to Firestore failed.");
    }
  }, [title]);

  return (
    <div className="d-flex flex-column vh-100">
      <div className="bg-light border-bottom p-2 d-flex gap-2 align-items-center">
        <input
          className="form-control"
          placeholder="Whiteboard Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoadingLibraries}
        />
        <button
          className="btn btn-primary"
          onClick={handleSaveTask}
          disabled={isLoadingLibraries}
        >
          Save Task
        </button>
      </div>

      {errorMessage && (
        <div className="alert alert-danger m-2 p-2">{errorMessage}</div>
      )}

      <div className="flex-grow-1 position-relative">
        <Excalidraw
          theme="light"
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
            },
          }}
        />
      </div>
    </div>
  );
};

export default ExcalidrawEditor;
