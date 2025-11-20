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
import {
  Users,
  Code,
  Palette,
  Shield,
  CheckCircle,
  Briefcase,
  Zap,
  Target,
  TrendingUp,
  GitBranch,
  Play,
  Download,
  BookOpen,
} from "lucide-react";
import { Link } from "wouter";

// Color mapping for agent cards - Tailwind requires complete class names at build time
const colorClasses = {
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
  },
  green: {
    bg: "bg-green-500/10",
    text: "text-green-400",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
  },
  red: {
    bg: "bg-red-500/10",
    text: "text-red-400",
  },
  yellow: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
  },
} as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
            <Zap className="w-3 h-3 mr-1" />
            Multi-Agent System Showcase
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Ihr Virtuelles Büro
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto">
            5 spezialisierte AI-Agents haben in einem Abend eine komplette
            E-Commerce-Plattform entwickelt
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/demo">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Play className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            </Link>
            <a
              href="https://github.com/136er/virtual-office-showcase/blob/main/GETTING_STARTED.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <BookOpen className="w-4 h-4 mr-2" />
                Getting Started
              </Button>
            </a>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Target className="w-4 h-4 mr-2" />
              Ergebnisse ansehen
            </Button>
            <a
              href="https://github.com/136er/virtual-office-showcase"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <GitBranch className="w-4 h-4 mr-2" />
                GitHub Repo
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Agents", value: "5", icon: Users },
            { label: "Code Lines", value: "2,500+", icon: Code },
            { label: "Test Coverage", value: "95%", icon: CheckCircle },
            { label: "Zeit", value: "1 Abend", icon: TrendingUp },
          ].map(stat => (
            <Card key={stat.label} className="bg-slate-900/50 border-slate-800">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <stat.icon className="w-8 h-8 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Agents Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Das Team</h2>
          <p className="text-slate-400 text-lg">
            5 spezialisierte Agents mit "Think Again"-Prozess
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              role: "Software Architekt",
              icon: Briefcase,
              backstory:
                "100 Jahre Erfahrung. Hat Systeme für Google, Amazon und NASA designed.",
              result: "Vollständige Architektur für 100k+ User",
              color: "blue",
            },
            {
              role: "Backend Entwickler",
              icon: Code,
              backstory: "DER Nummer-1-Experte für Python und Django weltweit.",
              result: "Production-ready Payment-API mit Stripe",
              color: "green",
            },
            {
              role: "Frontend Entwickler",
              icon: Palette,
              backstory:
                "React-Weltmeister. Hat UIs für Airbnb, Netflix und Spotify gebaut.",
              result: "Checkout-Page < 100ms, WCAG AA",
              color: "purple",
            },
            {
              role: "Security Spezialist",
              icon: Shield,
              backstory:
                "Paranoider Ex-NSA-Agent. Findet jede Sicherheitslücke.",
              result: "Komplettes Security-Audit, PCI DSS",
              color: "red",
            },
            {
              role: "QA Engineer",
              icon: CheckCircle,
              backstory:
                "Obsessiver Perfektionist. Ungetesteter Code ist kaputter Code.",
              result: "95%+ Test Coverage, alle Edge Cases",
              color: "yellow",
            },
          ].map(agent => {
            const colors =
              colorClasses[agent.color as keyof typeof colorClasses];
            return (
              <Card
                key={agent.role}
                className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center mb-4`}
                  >
                    <agent.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <CardTitle className="text-white">{agent.role}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {agent.backstory}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-slate-300">{agent.result}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Die Ergebnisse</h2>
          <p className="text-slate-400 text-lg">
            Production-ready E-Commerce-Plattform
          </p>
        </div>

        <Tabs defaultValue="architecture" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-900/50 border border-slate-800">
            <TabsTrigger value="architecture">Architektur</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="architecture" className="mt-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">System-Architektur</CardTitle>
                <CardDescription className="text-slate-400">
                  Designed für 100.000 gleichzeitige Nutzer mit 99.9% Uptime
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Tech Stack</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Frontend: React 18 + TypeScript + Vite</li>
                      <li>• Backend: Django 4.2 + Python 3.11</li>
                      <li>• Database: PostgreSQL + Redis</li>
                      <li>• Queue: Celery</li>
                      <li>• Payments: Stripe</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Skalierung</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Horizontal Scaling</li>
                      <li>• Load Balancer</li>
                      <li>• Circuit Breakers</li>
                      <li>• Retry Logic mit Exponential Backoff</li>
                      <li>• Caching-Strategie</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backend" className="mt-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">
                  Payment-Processing-API
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Production-ready Django-Code mit Stripe-Integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white">
                        Idempotenz-Handling
                      </h4>
                      <p className="text-sm text-slate-400">
                        Gleiche Request mehrfach = gleiches Ergebnis
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white">
                        Graceful Failure Handling
                      </h4>
                      <p className="text-sm text-slate-400">
                        Behandelt Stripe-Ausfälle ohne Datenverlust
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white">
                        Asynchrone Verarbeitung
                      </h4>
                      <p className="text-sm text-slate-400">
                        Celery Task Queue für Background-Jobs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white">
                        Rate Limiting
                      </h4>
                      <p className="text-sm text-slate-400">
                        Schutz gegen Missbrauch und DDoS
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="frontend" className="mt-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Checkout-Page</CardTitle>
                <CardDescription className="text-slate-400">
                  World-class React-Komponente mit TypeScript
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Performance</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Render-Zeit: &lt; 100ms</li>
                      <li>• Bundle-Size optimiert</li>
                      <li>• Lazy Loading</li>
                      <li>• Optimistische Updates</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Accessibility</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• WCAG AA Standard</li>
                      <li>• Screen Reader Support</li>
                      <li>• Keyboard Navigation</li>
                      <li>• ARIA Labels</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Security-Audit</CardTitle>
                <CardDescription className="text-slate-400">
                  Umfassende Sicherheitsprüfung nach OWASP Top 10
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "SQL Injection ✅ (Django ORM schützt)",
                    "XSS ✅ (Input Sanitization)",
                    "CSRF ✅ (Django CSRF Protection)",
                    "Authentication & Authorization ✅",
                    "Rate Limiting ✅",
                    "Daten-Verschlüsselung ✅ (HTTPS, TLS)",
                    "PCI DSS Compliance ✅",
                  ].map(check => (
                    <div key={check} className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-slate-300">{check}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testing" className="mt-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Test-Suite</CardTitle>
                <CardDescription className="text-slate-400">
                  Comprehensive Testing mit 95%+ Coverage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Backend</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Unit Tests (95%+)</li>
                      <li>• Integration Tests</li>
                      <li>• Performance Tests</li>
                      <li>• Security Tests</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Frontend</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Unit Tests (90%+)</li>
                      <li>• Component Tests</li>
                      <li>• E2E Tests (Cypress)</li>
                      <li>• Accessibility Tests</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Edge Cases</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Network Failures</li>
                      <li>• API Errors</li>
                      <li>• Stripe Failures</li>
                      <li>• Idempotency</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Think Again Process */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Der "Think Again"-Prozess
          </h2>
          <p className="text-slate-400 text-lg">
            Jeder Agent kritisiert und verbessert sein eigenes Work
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              step: "1. Initiale Lösung",
              description:
                "Agent erstellt eine erste Version basierend auf den Anforderungen",
            },
            {
              step: "2. Selbst-Kritik",
              description:
                "Agent fragt sich: 'Was könnte versagen? Was skaliert nicht? Was habe ich übersehen?'",
            },
            {
              step: "3. Überarbeitung",
              description:
                "Agent verbessert die Lösung basierend auf der Kritik",
            },
            {
              step: "4. Finale Version",
              description:
                "Agent liefert das kampferprobte, production-ready Ergebnis",
            },
          ].map((item, index) => (
            <Card key={index} className="bg-slate-900/50 border-slate-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">
                      {item.step}
                    </h4>
                    <p className="text-sm text-slate-400">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How to Get Started Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Wie nutze ich das Projekt?
          </h2>
          <p className="text-slate-400 text-lg">
            Zwei einfache Wege, um loszulegen
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Clone with Git */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-blue-400" />
                Mit Git klonen (empfohlen)
              </CardTitle>
              <CardDescription className="text-slate-400">
                Für Entwickler, die Updates erhalten möchten
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-lg">
                <code className="text-sm text-green-400 font-mono">
                  git clone https://github.com/136er/virtual-office-showcase.git
                </code>
              </div>
              <p className="text-sm text-slate-300">
                Dann installieren und starten:
              </p>
              <div className="bg-slate-950 p-4 rounded-lg space-y-2">
                <code className="text-sm text-green-400 font-mono block">
                  pnpm install
                </code>
                <code className="text-sm text-green-400 font-mono block">
                  pnpm dev
                </code>
              </div>
              <a
                href="https://github.com/136er/virtual-office-showcase/blob/main/GETTING_STARTED.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Ausführliche Anleitung
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Download as ZIP */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-green-400" />
                Als ZIP herunterladen
              </CardTitle>
              <CardDescription className="text-slate-400">
                Schnell und einfach, ohne Git
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 text-xs font-bold">1</span>
                  </div>
                  <p>Gehe zu GitHub Repository</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 text-xs font-bold">2</span>
                  </div>
                  <p>Klicke auf den grünen "Code" Button</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 text-xs font-bold">3</span>
                  </div>
                  <p>Wähle "Download ZIP"</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 text-xs font-bold">4</span>
                  </div>
                  <p>Entpacke die Datei und folge den Schritten oben</p>
                </div>
              </div>
              <a href="https://github.com/136er/virtual-office-showcase/archive/refs/heads/main.zip">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  ZIP herunterladen
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Simple Guide Link */}
        <div className="text-center mt-8">
          <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 text-base px-4 py-2">
            <BookOpen className="w-4 h-4 mr-2" />
            Neu im Coding? Lies unsere{" "}
            <a
              href="https://github.com/136er/virtual-office-showcase/blob/main/GETTING_STARTED.md"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-yellow-300 ml-1"
            >
              Schritt-für-Schritt Anleitung
            </a>
          </Badge>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Bereit für Ihr eigenes virtuelles Büro?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Orchestrieren Sie Ihr eigenes Team von AI-Agents und bauen Sie
              Production-Ready Software in Rekordzeit.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/code">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Code className="w-4 h-4 mr-2" />
                  Code ansehen
                </Button>
              </Link>
              <a
                href="https://github.com/136er/virtual-office-showcase"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  <GitBranch className="w-4 h-4 mr-2" />
                  GitHub-Repo
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-slate-800">
        <div className="text-center text-slate-400 text-sm">
          <p>Gebaut mit Multi-Agent-System • CrewAI • Google Gemini 2.5 Pro</p>
          <p className="mt-2">
            Von 0 zum Fullstack-Developer in einem Abend 🚀
          </p>
        </div>
      </footer>
    </div>
  );
}
