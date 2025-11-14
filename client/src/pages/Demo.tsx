import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Briefcase, 
  Code, 
  Palette, 
  Shield, 
  CheckCircle,
  Play,
  Loader2,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { Link } from "wouter";

interface Agent {
  id: string;
  role: string;
  icon: typeof Briefcase;
  backstory: string;
  color: string;
}

const agents: Agent[] = [
  {
    id: "architect",
    role: "Software Architekt",
    icon: Briefcase,
    backstory: "100 Jahre Erfahrung. Designed Systeme für maximale Skalierbarkeit.",
    color: "blue"
  },
  {
    id: "backend",
    role: "Backend Entwickler",
    icon: Code,
    backstory: "Python/Django Guru. Schreibt production-ready Code.",
    color: "green"
  },
  {
    id: "frontend",
    role: "Frontend Entwickler",
    icon: Palette,
    backstory: "React-Weltmeister. Performance-besessen.",
    color: "purple"
  },
  {
    id: "security",
    role: "Security Spezialist",
    icon: Shield,
    backstory: "Ex-NSA. Findet jede Sicherheitslücke.",
    color: "red"
  },
  {
    id: "qa",
    role: "QA Engineer",
    icon: CheckCircle,
    backstory: "Perfektionist. Ungetesteter Code ist kaputter Code.",
    color: "yellow"
  }
];

interface AgentResponse {
  agent: string;
  step: string;
  content: string;
}

const exampleTasks = [
  "Baue eine Todo-App mit React und TypeScript",
  "Erstelle eine REST API für User-Management",
  "Implementiere ein Login-System mit JWT",
  "Designe eine Landing Page für ein SaaS-Produkt"
];

export default function Demo() {
  const [task, setTask] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [responses, setResponses] = useState<AgentResponse[]>([]);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);

  const simulateAgentWork = async (agent: Agent, taskDescription: string) => {
    setCurrentAgent(agent.id);
    
    // Simulate "Think Again" process
    const steps = [
      { step: "1. Initiale Analyse", delay: 1000 },
      { step: "2. Selbst-Kritik", delay: 1500 },
      { step: "3. Überarbeitung", delay: 1200 },
      { step: "4. Finale Lösung", delay: 800 }
    ];

    for (const { step, delay } of steps) {
      await new Promise(resolve => setTimeout(resolve, delay));
      
      let content = "";
      
      // Generate realistic responses based on agent role and task
      if (agent.id === "architect") {
        if (step === "1. Initiale Analyse") {
          content = "Analysiere Anforderungen... System benötigt Frontend, Backend, Datenbank.";
        } else if (step === "2. Selbst-Kritik") {
          content = "Kritik: Skalierung nicht berücksichtigt. Was bei 10k Usern?";
        } else if (step === "3. Überarbeitung") {
          content = "Füge Load Balancer, Caching-Layer und Microservices-Architektur hinzu.";
        } else {
          content = "✅ Architektur komplett: React Frontend, Django Backend, PostgreSQL, Redis Cache, horizontal skalierbar.";
        }
      } else if (agent.id === "backend") {
        if (step === "1. Initiale Analyse") {
          content = "Schreibe API-Endpoints... Basis CRUD-Operationen implementiert.";
        } else if (step === "2. Selbst-Kritik") {
          content = "Kritik: Keine Error Handling, keine Validierung, keine Tests.";
        } else if (step === "3. Überarbeitung") {
          content = "Füge Input-Validierung, Try-Catch-Blöcke, Logging und Unit Tests hinzu.";
        } else {
          content = "✅ API komplett: RESTful Endpoints, Error Handling, Validierung, 95% Test Coverage.";
        }
      } else if (agent.id === "frontend") {
        if (step === "1. Initiale Analyse") {
          content = "Erstelle UI-Komponenten... Basis-Layout mit React fertig.";
        } else if (step === "2. Selbst-Kritik") {
          content = "Kritik: Performance nicht optimal, keine Accessibility, Bundle zu groß.";
        } else if (step === "3. Überarbeitung") {
          content = "Optimiere mit React.memo, lazy loading, ARIA-Labels, Code-Splitting.";
        } else {
          content = "✅ UI komplett: < 100ms Render-Zeit, WCAG AA, optimierte Bundle-Size.";
        }
      } else if (agent.id === "security") {
        if (step === "1. Initiale Analyse") {
          content = "Scanne Code nach Schwachstellen... Erste Analyse läuft.";
        } else if (step === "2. Selbst-Kritik") {
          content = "Gefunden: SQL Injection möglich, XSS-Risiko, keine Rate Limiting.";
        } else if (step === "3. Überarbeitung") {
          content = "Empfehle: Prepared Statements, Input Sanitization, Rate Limiter, HTTPS.";
        } else {
          content = "✅ Security-Audit komplett: Alle OWASP Top 10 geprüft, Fixes dokumentiert.";
        }
      } else if (agent.id === "qa") {
        if (step === "1. Initiale Analyse") {
          content = "Erstelle Test-Plan... Identifiziere Test-Szenarien.";
        } else if (step === "2. Selbst-Kritik") {
          content = "Kritik: Nur Happy Path getestet, Edge Cases fehlen, keine E2E Tests.";
        } else if (step === "3. Überarbeitung") {
          content = "Füge Edge Case Tests, Integration Tests, E2E Tests mit Cypress hinzu.";
        } else {
          content = "✅ Test-Suite komplett: Unit, Integration, E2E, 95%+ Coverage.";
        }
      }

      setResponses(prev => [...prev, {
        agent: agent.role,
        step,
        content
      }]);
    }
    
    setCurrentAgent(null);
  };

  const runDemo = async () => {
    if (!task.trim()) return;
    
    setIsRunning(true);
    setResponses([]);
    
    // Run agents sequentially
    for (const agent of agents) {
      await simulateAgentWork(agent, task);
    }
    
    setIsRunning(false);
  };

  const loadExample = (example: string) => {
    setTask(example);
    setResponses([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="text-slate-400 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>
        </Link>
        <div className="text-center space-y-4">
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Interaktive Demo
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Probieren Sie das Agent-System
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Geben Sie eine Aufgabe ein und sehen Sie, wie die 5 Agents zusammenarbeiten
          </p>
        </div>
      </header>

      {/* Demo Interface */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Ihre Aufgabe</CardTitle>
                <CardDescription className="text-slate-400">
                  Beschreiben Sie, was Sie bauen möchten
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="z.B. Baue eine Todo-App mit React und TypeScript..."
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="min-h-[120px] bg-slate-950 border-slate-700 text-white"
                  disabled={isRunning}
                />
                
                <div className="space-y-2">
                  <p className="text-sm text-slate-400">Oder wählen Sie ein Beispiel:</p>
                  <div className="flex flex-wrap gap-2">
                    {exampleTasks.map((example, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        onClick={() => loadExample(example)}
                        disabled={isRunning}
                        className="text-xs border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        {example}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={runDemo}
                  disabled={!task.trim() || isRunning}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Agents arbeiten...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Agents starten
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Agent Status */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Agent-Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      currentAgent === agent.id
                        ? 'bg-purple-500/10 border border-purple-500/20'
                        : 'bg-slate-950/50'
                    }`}
                  >
                    <agent.icon className={`w-5 h-5 ${
                      currentAgent === agent.id ? 'text-purple-400' : 'text-slate-500'
                    }`} />
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{agent.role}</div>
                      <div className="text-xs text-slate-400">{agent.backstory}</div>
                    </div>
                    {currentAgent === agent.id && (
                      <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div>
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Ergebnisse</CardTitle>
                <CardDescription className="text-slate-400">
                  Live-Ausgabe der Agents mit "Think Again"-Prozess
                </CardDescription>
              </CardHeader>
              <CardContent>
                {responses.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Starten Sie die Demo, um die Agents in Aktion zu sehen</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {responses.map((response, i) => (
                      <div
                        key={i}
                        className="bg-slate-950/50 p-4 rounded-lg border border-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs border-purple-500/20 text-purple-400">
                            {response.agent}
                          </Badge>
                          <span className="text-xs text-slate-500">{response.step}</span>
                        </div>
                        <p className="text-sm text-slate-300">{response.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="container mx-auto px-4 py-12">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-white">Wie funktioniert das?</h3>
              <p className="text-sm text-slate-400 max-w-2xl mx-auto">
                Dies ist eine vereinfachte Simulation des Multi-Agent-Systems. Jeder Agent durchläuft den 
                "Think Again"-Prozess: Initiale Lösung → Selbst-Kritik → Überarbeitung → Finale Version. 
                In der echten Implementation nutzen die Agents OpenAI GPT-4 und arbeiten mit echtem Code.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

