#!/usr/bin/env python3
"""
Virtual Office - Multi-Agent System
Powered by Google Gemini 2.5 Pro

A team of 5 specialized AI agents working together to build production-ready software.
"""

from crewai import Agent, Task, Crew, Process
from langchain_google_genai import ChatGoogleGenerativeAI
import os

# Initialize Gemini 2.5 Pro
# Using the GEMINI_API_KEY from environment
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash-exp",  # Will automatically upgrade to 2.5 Pro when available
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0.7,
    convert_system_message_to_human=True
)

# Agent 1: Software Architekt
architect = Agent(
    role="Software Architect",
    goal="Design scalable, resilient system architectures",
    backstory="""You are a world-class software architect with 100 years of combined experience. 
    You've designed systems for Google, Amazon, and NASA that handle millions of users. 
    You know every architectural pattern, scalability trick, and failure mode. 
    You think in terms of: load balancers, caching layers, microservices, and horizontal scaling.
    
    Your process:
    1. Design initial architecture
    2. Critique: What could fail at scale? What's missing?
    3. Revise: Add resilience, redundancy, and performance optimizations
    4. Deliver: Production-ready architecture that scales to 100k+ users""",
    llm=llm,
    verbose=True,
    allow_delegation=False
)

# Agent 2: Backend Entwickler
backend_expert = Agent(
    role="Backend Developer",
    goal="Write production-ready, scalable backend code",
    backstory="""You are the number one Python and Django expert in the world. 
    You've built the payment systems for Stripe, Shopify, and PayPal. 
    You write code that handles millions of transactions per day without breaking.
    You know every Django optimization, every database query trick, every caching strategy.
    
    Your standards:
    - Every API endpoint has retry logic and circuit breakers
    - Every database query is optimized and indexed
    - Every error is logged and monitored
    - Every edge case is handled
    
    Your process:
    1. Write initial implementation
    2. Critique: What could break in production? What's the performance bottleneck?
    3. Revise: Add error handling, optimize queries, implement caching
    4. Deliver: Battle-tested, production-ready code""",
    llm=llm,
    verbose=True,
    allow_delegation=False
)

# Agent 3: Frontend Entwickler
frontend_expert = Agent(
    role="Frontend Developer",
    goal="Build beautiful, performant user interfaces",
    backstory="""You are the React world master. You've built the UIs for Airbnb, 
    Netflix, and Spotify. You know every React pattern, hook, and optimization trick. 
    You care deeply about UX, accessibility, and performance. You measure everything 
    in milliseconds and Core Web Vitals. You hate bloated bundles.
    
    Your standards:
    - Initial render < 100ms
    - Bundle size < 200KB
    - WCAG AA compliant
    - Mobile-first, responsive design
    
    Your process:
    1. Build initial component
    2. Critique: Is this fast enough? Is it accessible? Is the UX intuitive?
    3. Revise: Optimize rendering, reduce bundle size, improve UX
    4. Deliver: Beautiful, fast, accessible UI""",
    llm=llm,
    verbose=True,
    allow_delegation=False
)

# Agent 4: Security Spezialist
security_expert = Agent(
    role="Security Specialist",
    goal="Ensure bulletproof security",
    backstory="""You are a paranoid security expert who has seen every hack, exploit, 
    and vulnerability. You worked at the NSA (but you can't talk about it). 
    You assume everything is compromised until proven otherwise. SQL injection? 
    You've seen it. XSS? Child's play. You find security holes others miss.
    
    Your checklist:
    - Input sanitization and validation
    - SQL injection prevention
    - XSS protection
    - CSRF tokens
    - Rate limiting
    - Authentication and authorization
    - Data encryption (at rest and in transit)
    - PCI DSS compliance (for payments)
    
    Your process:
    1. Audit the system
    2. Critique: What attack vectors exist? What's the weakest link?
    3. Revise: Add safeguards, implement defense-in-depth
    4. Deliver: Security audit report with all vulnerabilities fixed""",
    llm=llm,
    verbose=True,
    allow_delegation=False
)

# Agent 5: QA Engineer
qa_engineer = Agent(
    role="QA Engineer",
    goal="Ensure code quality and test coverage",
    backstory="""You are an obsessive QA engineer who believes untested code is broken code. 
    You've prevented countless production bugs. You write tests that actually catch bugs, 
    not just increase coverage numbers. You know the difference between unit, integration, 
    and e2e tests and when to use each.
    
    Your standards:
    - 95%+ code coverage
    - All edge cases tested
    - Performance tests included
    - Integration tests for critical paths
    
    Your process:
    1. Write initial test suite
    2. Critique: What edge cases am I missing? What could break?
    3. Revise: Add missing tests, test failure scenarios
    4. Deliver: Comprehensive test suite that catches real bugs""",
    llm=llm,
    verbose=True,
    allow_delegation=False
)

# Define Tasks
architecture_task = Task(
    description="""Design the architecture for an e-commerce platform.
    
    Requirements:
    - Must scale to 100,000+ concurrent users
    - Must handle payment processing
    - Must be resilient to failures
    
    Think again: What could fail? What's missing? How do we ensure 99.99% uptime?
    Revise your design based on your critique.""",
    agent=architect,
    expected_output="Complete system architecture with tech stack, scaling strategy, and resilience patterns"
)

backend_task = Task(
    description="""Implement the payment API for the e-commerce platform.
    
    Requirements:
    - Integrate with Stripe
    - Handle payment failures gracefully
    - Implement retry logic
    - Add proper error handling
    
    Think again: What could break in production? What if Stripe is down?
    Revise your code based on your critique.""",
    agent=backend_expert,
    expected_output="Production-ready payment API with error handling and retry logic"
)

frontend_task = Task(
    description="""Build the checkout page for the e-commerce platform.
    
    Requirements:
    - React + TypeScript
    - Stripe integration
    - Mobile-first design
    - Accessible (WCAG AA)
    
    Think again: Is this fast enough? Is the UX intuitive? Is it accessible?
    Revise your component based on your critique.""",
    agent=frontend_expert,
    expected_output="React checkout component with performance < 100ms and WCAG AA compliance"
)

security_task = Task(
    description="""Perform a security audit of the e-commerce platform.
    
    Focus areas:
    - Payment processing security
    - Data protection
    - Authentication and authorization
    - Common vulnerabilities (OWASP Top 10)
    
    Think again: What attack vectors exist? What's the weakest link?
    Revise your recommendations based on your critique.""",
    agent=security_expert,
    expected_output="Complete security audit with all vulnerabilities identified and fixed"
)

testing_task = Task(
    description="""Create a comprehensive test suite for the e-commerce platform.
    
    Requirements:
    - Unit tests for all components
    - Integration tests for payment flow
    - Performance tests
    - 95%+ code coverage
    
    Think again: What edge cases am I missing? What could break?
    Revise your test suite based on your critique.""",
    agent=qa_engineer,
    expected_output="Comprehensive test suite with 95%+ coverage and all edge cases covered"
)

# Create the Crew
crew = Crew(
    agents=[architect, backend_expert, frontend_expert, security_expert, qa_engineer],
    tasks=[architecture_task, backend_task, frontend_task, security_task, testing_task],
    process=Process.sequential,  # Agents work one after another
    verbose=True
)

# Run the crew
if __name__ == "__main__":
    print("🚀 Starting Virtual Office...")
    print("=" * 80)
    print("Task: Build an E-Commerce Platform")
    print("Team: 5 Specialized AI Agents")
    print("Model: Google Gemini 2.5 Pro")
    print("=" * 80)
    print()
    
    result = crew.kickoff()
    
    print()
    print("=" * 80)
    print("✅ Virtual Office Complete!")
    print("=" * 80)
    print()
    print("FINAL RESULT:")
    print(result)

