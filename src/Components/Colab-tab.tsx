import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Colab-tab.css";

const Pricing = () => {
  const freeFeatures = ["To-Do List", "Pomodoro Timer", "Dashboard Tracker"];
  const premiumFeatures = [
    "To-Do List",
    "Pomodoro Timer",
    "Dashboard Tracker",
    "Brainstorming",
    "FlashCard",
    "Task Automation",
    "Cloud Synchronization",
    "Claimable Rewards (Spotify Premium, Canva Pro, Netflix)",
  ];

  return (
    <Container className="mt-5">
      <h2 className="display-4 text-center pb-3" id="pricing-header">
        Pricing Plans
      </h2>
      <p className="lead text-center pb-5">
        Choose the plan that suits your needs and take your productivity to the
        next level!
      </p>

      <Row className="justify-content-center">
        {/* Free Plan Card */}
        <Col md={4} className="mb-4">
          <Card id="pricing-free-plan" className="shadow-sm">
            <Card.Body>
              <Card.Title className="h4">Free Plan</Card.Title>
              <Card.Text className="text-muted">
                Ideal for getting started
              </Card.Text>
              <Card.Text>
                <strong>Included Features:</strong>
                <ul>
                  {freeFeatures.map((feature, index) => (
                    <li key={`free-feature-${index}`}>{feature}</li>
                  ))}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Monthly Premium Plan Card */}
        <Col md={4} className="mb-4">
          <Card id="pricing-monthly-premium" className="shadow-sm">
            <Card.Body>
              <Card.Title className="h4">Premium Plan - Monthly</Card.Title>
              <Card.Text className="text-muted">
                Get advanced features and productivity tools on a monthly basis.
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ₱299/month
              </Card.Text>
              <Card.Text>
                <strong>Included Features:</strong>
                <ul>
                  {premiumFeatures.map((feature, index) => (
                    <li key={`monthly-feature-${index}`}>{feature}</li>
                  ))}
                </ul>
              </Card.Text>
              <Button variant="primary" className="w-100">
                Upgrade to Premium
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Annual Premium Plan Card */}
        <Col md={4} className="mb-4">
          <Card id="pricing-annual-premium" className="shadow-sm">
            <Card.Body>
              <Card.Title className="h4">Premium Plan - Annual</Card.Title>
              <Card.Text className="text-muted">
                Save on a yearly plan and access all premium features.
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ₱2,999/year
              </Card.Text>
              <Card.Text>
                <strong>Included Features:</strong>
                <ul>
                  {premiumFeatures.map((feature, index) => (
                    <li key={`annual-feature-${index}`}>{feature}</li>
                  ))}
                </ul>
              </Card.Text>
              <Button variant="primary" className="w-100">
                Upgrade to Premium
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Pricing;
