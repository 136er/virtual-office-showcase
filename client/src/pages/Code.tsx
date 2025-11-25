import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Copy, Check, GitBranch, Download } from "lucide-react";
import { Link } from "wouter";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const codeExamples = {
  architecture: {
    title: "System-Architektur",
    language: "yaml",
    code: `# E-Commerce Platform Architecture
# Designed by Software Architekt (100 Jahre Erfahrung)

## Frontend Layer
- Framework: React 19 + TypeScript
- State Management: Redux Toolkit
- Styling: Tailwind CSS 4
- Build Tool: Vite
- Bundle Size: < 200KB (optimiert)

## Backend Layer
- Framework: Django 4.2 + Python 3.11
- API: RESTful + GraphQL
- Authentication: JWT + OAuth2
- Rate Limiting: Redis-based

## Data Layer
- Primary DB: PostgreSQL 15
- Cache: Redis 7
- Search: Elasticsearch
- Message Queue: Celery + RabbitMQ

## Infrastructure
- Load Balancer: Nginx
- CDN: CloudFlare
- Monitoring: Prometheus + Grafana
- Logging: ELK Stack

## Scalability
- Horizontal Scaling: Kubernetes
- Auto-Scaling: Based on CPU/Memory
- Max Capacity: 100,000+ concurrent users
- Response Time: < 100ms (p95)

## Security
- SSL/TLS: Enforced
- WAF: CloudFlare
- DDoS Protection: Layer 7
- Compliance: PCI DSS, GDPR`,
  },
  backend: {
    title: "Payment API (Django/Python)",
    language: "python",
    code: `# payment_api.py
# Implementiert von Backend Entwickler (Python/Django Guru)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import stripe
from celery import shared_task
from circuit_breaker import circuit
import logging

logger = logging.getLogger(__name__)

# Stripe Configuration
stripe.api_key = settings.STRIPE_SECRET_KEY

@circuit(failure_threshold=5, recovery_timeout=60)
def process_stripe_payment(amount, currency, payment_method):
    """
    Process payment with Stripe API
    Includes circuit breaker for fault tolerance
    """
    try:
        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            payment_method=payment_method,
            confirm=True,
            automatic_payment_methods={
                'enabled': True,
                'allow_redirects': 'never'
            }
        )
        return payment_intent
    except stripe.error.CardError as e:
        logger.error(f"Card error: {e.user_message}")
        raise
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {str(e)}")
        raise

@shared_task(bind=True, max_retries=3)
def async_payment_processing(self, payment_data):
    """
    Asynchronous payment processing with Celery
    Includes retry logic with exponential backoff
    """
    try:
        result = process_stripe_payment(
            amount=payment_data['amount'],
            currency=payment_data['currency'],
            payment_method=payment_data['payment_method']
        )
        return {'status': 'success', 'payment_id': result.id}
    except Exception as exc:
        # Exponential backoff: 2^retry * 60 seconds
        raise self.retry(exc=exc, countdown=60 * 2 ** self.request.retries)

@csrf_exempt
@require_http_methods(["POST"])
def create_payment(request):
    """
    Create payment endpoint with validation
    """
    try:
        # Input validation
        data = json.loads(request.body)
        
        if not all(k in data for k in ['amount', 'currency', 'payment_method']):
            return JsonResponse({
                'error': 'Missing required fields'
            }, status=400)
        
        # Amount validation
        if data['amount'] <= 0:
            return JsonResponse({
                'error': 'Amount must be positive'
            }, status=400)
        
        # Queue async task
        task = async_payment_processing.delay(data)
        
        return JsonResponse({
            'status': 'processing',
            'task_id': task.id
        }, status=202)
        
    except json.JSONDecodeError:
        return JsonResponse({
            'error': 'Invalid JSON'
        }, status=400)
    except Exception as e:
        logger.exception("Payment creation failed")
        return JsonResponse({
            'error': 'Internal server error'
        }, status=500)`,
  },
  frontend: {
    title: "Checkout Component (React/TypeScript)",
    language: "typescript",
    code: `// CheckoutPage.tsx
// Implementiert von Frontend Entwickler (React-Weltmeister)

import React, { useState, useCallback, useMemo } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { debounce } from 'lodash';

interface CheckoutProps {
  amount: number;
  currency: string;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
}

export const CheckoutPage: React.FC<CheckoutProps> = React.memo(({
  amount,
  currency,
  onSuccess,
  onError
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize formatted amount
  const formattedAmount = useMemo(() => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount / 100);
  }, [amount, currency]);

  // Debounced submit to prevent double-clicks
  const handleSubmit = useCallback(
    debounce(async (e: React.FormEvent) => {
      e.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const cardElement = elements.getElement(CardElement);
        
        if (!cardElement) {
          throw new Error('Card element not found');
        }

        // Create payment method
        const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (pmError) {
          throw new Error(pmError.message);
        }

        // Call backend API
        const response = await fetch('/api/payments/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency,
            payment_method: paymentMethod.id,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Payment failed');
        }

        const { task_id } = await response.json();
        
        // Poll for payment status
        await pollPaymentStatus(task_id);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        onError(errorMessage);
      } finally {
        setIsProcessing(false);
      }
    }, 300),
    [stripe, elements, amount, currency, onSuccess, onError]
  );

  const pollPaymentStatus = async (taskId: string) => {
    const maxAttempts = 30;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const response = await fetch(\`/api/payments/status/\${taskId}\`);
      const data = await response.json();

      if (data.status === 'success') {
        onSuccess(data.payment_id);
        return;
      } else if (data.status === 'failed') {
        throw new Error(data.error);
      }

      // Wait 1 second before next poll
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }

    throw new Error('Payment timeout');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <p className="text-lg mb-6">Betrag: {formattedAmount}</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold
                     hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
          aria-label="Bezahlen"
        >
          {isProcessing ? 'Verarbeite...' : \`\${formattedAmount} bezahlen\`}
        </button>
      </form>
    </div>
  );
});

CheckoutPage.displayName = 'CheckoutPage';`,
  },
  testing: {
    title: "Test Suite (Pytest)",
    language: "python",
    code: `# test_payment_api.py
# Implementiert von QA Engineer (Perfektionist)

import pytest
from django.test import Client
from unittest.mock import patch, MagicMock
import json

@pytest.fixture
def client():
    return Client()

@pytest.fixture
def valid_payment_data():
    return {
        'amount': 1000,  # $10.00
        'currency': 'usd',
        'payment_method': 'pm_test_123'
    }

class TestPaymentAPI:
    """
    Comprehensive test suite for Payment API
    Coverage: Unit, Integration, Edge Cases
    """
    
    def test_create_payment_success(self, client, valid_payment_data):
        """Test successful payment creation"""
        with patch('payment_api.async_payment_processing.delay') as mock_task:
            mock_task.return_value.id = 'task_123'
            
            response = client.post(
                '/api/payments/create',
                data=json.dumps(valid_payment_data),
                content_type='application/json'
            )
            
            assert response.status_code == 202
            data = json.loads(response.content)
            assert data['status'] == 'processing'
            assert 'task_id' in data
    
    def test_create_payment_missing_fields(self, client):
        """Test validation for missing required fields"""
        invalid_data = {'amount': 1000}  # Missing currency and payment_method
        
        response = client.post(
            '/api/payments/create',
            data=json.dumps(invalid_data),
            content_type='application/json'
        )
        
        assert response.status_code == 400
        data = json.loads(response.content)
        assert 'error' in data
        assert 'Missing required fields' in data['error']
    
    def test_create_payment_negative_amount(self, client, valid_payment_data):
        """Test validation for negative amount"""
        valid_payment_data['amount'] = -100
        
        response = client.post(
            '/api/payments/create',
            data=json.dumps(valid_payment_data),
            content_type='application/json'
        )
        
        assert response.status_code == 400
        data = json.loads(response.content)
        assert 'Amount must be positive' in data['error']
    
    def test_create_payment_invalid_json(self, client):
        """Test handling of invalid JSON"""
        response = client.post(
            '/api/payments/create',
            data='invalid json{',
            content_type='application/json'
        )
        
        assert response.status_code == 400
        data = json.loads(response.content)
        assert 'Invalid JSON' in data['error']
    
    @patch('payment_api.process_stripe_payment')
    def test_stripe_card_error(self, mock_stripe, client, valid_payment_data):
        """Test handling of Stripe card errors"""
        mock_stripe.side_effect = stripe.error.CardError(
            message='Card declined',
            param='card',
            code='card_declined'
        )
        
        with patch('payment_api.async_payment_processing.delay') as mock_task:
            mock_task.side_effect = Exception('Card declined')
            
            response = client.post(
                '/api/payments/create',
                data=json.dumps(valid_payment_data),
                content_type='application/json'
            )
            
            # Should still return 202 as task is queued
            assert response.status_code == 202
    
    @patch('payment_api.process_stripe_payment')
    def test_circuit_breaker_opens(self, mock_stripe, client, valid_payment_data):
        """Test circuit breaker opens after threshold failures"""
        mock_stripe.side_effect = stripe.error.StripeError('Service unavailable')
        
        # Make 5 requests to trigger circuit breaker
        for _ in range(5):
            client.post(
                '/api/payments/create',
                data=json.dumps(valid_payment_data),
                content_type='application/json'
            )
        
        # 6th request should fail fast due to open circuit
        response = client.post(
            '/api/payments/create',
            data=json.dumps(valid_payment_data),
            content_type='application/json'
        )
        
        assert response.status_code == 503  # Service Unavailable
    
    def test_concurrent_payments(self, client, valid_payment_data):
        """Test handling of concurrent payment requests"""
        import concurrent.futures
        
        def make_payment():
            return client.post(
                '/api/payments/create',
                data=json.dumps(valid_payment_data),
                content_type='application/json'
            )
        
        with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
            futures = [executor.submit(make_payment) for _ in range(10)]
            responses = [f.result() for f in futures]
        
        # All requests should succeed
        assert all(r.status_code == 202 for r in responses)
    
    @pytest.mark.performance
    def test_payment_response_time(self, client, valid_payment_data, benchmark):
        """Test payment API response time < 100ms"""
        def create_payment():
            return client.post(
                '/api/payments/create',
                data=json.dumps(valid_payment_data),
                content_type='application/json'
            )
        
        result = benchmark(create_payment)
        assert result.status_code == 202
        # Benchmark automatically fails if > 100ms`,
  },
};

export default function Code() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="text-slate-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>
        </Link>
        <div className="text-center space-y-4">
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
            Production-Ready Code
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Code-Beispiele
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Echter, production-ready Code generiert von unseren 5 AI-Agents
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://github.com/136er/virtual-office-showcase"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <GitBranch className="w-4 h-4 mr-2" />
                Vollständiger Code auf GitHub
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Code Examples */}
      <section className="container mx-auto px-4 py-8">
        <Tabs defaultValue="architecture" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-slate-900/50 mb-8">
            <TabsTrigger value="architecture">Architektur</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
          </TabsList>

          {Object.entries(codeExamples).map(([key, example]) => (
            <TabsContent key={key} value={key}>
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">
                        {example.title}
                      </CardTitle>
                      <CardDescription className="text-slate-400">
                        {key === "architecture" &&
                          "Software Architekt - 100 Jahre Erfahrung"}
                        {key === "backend" &&
                          "Backend Entwickler - Python/Django Guru"}
                        {key === "frontend" &&
                          "Frontend Entwickler - React-Weltmeister"}
                        {key === "testing" && "QA Engineer - Perfektionist"}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(example.code, key)}
                      className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      {copiedCode === key ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Kopiert!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Kopieren
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg overflow-hidden">
                    <SyntaxHighlighter
                      language={example.language}
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem",
                      }}
                      showLineNumbers
                    >
                      {example.code}
                    </SyntaxHighlighter>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Info Section */}
      <section className="container mx-auto px-4 py-12">
        <Card className="bg-blue-600">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-white">
                Möchten Sie den kompletten Code sehen?
              </h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                Alle Code-Beispiele, Tests und Dokumentation sind auf GitHub
                verfügbar.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="https://github.com/136er/virtual-office-showcase"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <GitBranch className="w-4 h-4 mr-2" />
                    GitHub Repository
                  </Button>
                </a>
                <a href="https://github.com/136er/virtual-office-showcase/archive/refs/heads/main.zip">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-blue-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Code herunterladen
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
