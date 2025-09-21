import React, { useState, useEffect } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";

// 🔹 Define types
type SyllabusData = {
  [branch: string]: {
    [semester: string]: {
      [subject: string]: {
        [unit: string]: string;
      };
    };
  };
};

// 🔹 Syllabus Data
const data: SyllabusData = {
  CSE: {
    "5th Sem": {
      "Compiler Design": {
        Unit1: "Compilers and translators, need of translators, structure of compiler: its different phases, compiler construction tools, Lexical analysis: Role of lexical analyzer, Input Buffering, A simple approach to the design of Lexical Analyzers, Specification and recognition of tokens, Finite automata, From regular expressions to automata, and vice versa, minimizing number of states of DFA, A language for specifying Lexical Analyzers, Design and implementation of lexical analyzer.",
        Unit2: "The role of the parser, Context free grammars, Writing a grammar: Lexical versus Syntactic analysis, Eliminating ambiguity, Elimination of left recursion, Left factoring, Top Down Parsing: Recursive‐Decent parsing, Non‐recursive Predictive parsing, LL(1) grammars, Bottom Up Parsing: Shift Reduce Parsing, Operator precedence parsing, LR Parsing: SLR, LALR and Canonical LR parser, Parser Generators.",
        Unit3: "Syntax Directed Translation: Syntax directed definitions, Evaluation orders for SDD's, construction of syntax trees, syntax directed translation schemes, implementation of syntax directed translation, Intermediate Code Generation: Kinds of intermediate code: Postfix notation, Parse trees and syntax trees, Three‐address code, quadruples and triples, Semantic Analysis: Types and Declarations, Translation of Expressions, Type checking.",
        Unit4: "Symbol Table: Symbol tables, its contents, Data Structure for Symbol Table: lists, trees, linked lists, hash tables, Error Detection and Recovery: Errors, lexical phase errors, syntactic phase errors, semantic errors, Error seen by each phase. Code Optimization: The principal sources of optimizations, Loop optimization, Basic blocks and Flow Graphs, DAG representation of basic blocks, Code Generation: Issues in the design of code generation, A simple target machine mode, A Simple Code Generator, Peep‐hole optimization, Register allocation and assignment."
      },
      "Computer Networks": {
        Unit1: "Data Communications: Components, Networks, The Internet, Protocols and Standards, Network Models: The OSI Model, TCP/IP Protocol Suite , A Comparison of the OSI and TCP/IP Reference Models, Addressing, Physical Layer: Analog and Digital Signals, Transmission modes, Transmission Media: Guided Media, Unguided Media, Review of Error Detection and Correction codes. Switching: Circuit switching (space‐division, time division and space‐time division), packet switching (virtual circuit and Datagram approach), message switching.",
        Unit2: "Data Link Layer: Design issues, Data Link Control and Protocols: Flow and Error Control, Stop‐and‐wait ARQ. Sliding window protocol, Go‐Back‐N ARQ, Selective Repeat ARQ, HDLC, Point‐to–Point Access: PPP Point–to–Point Protocol, PPP Stack, Medium Access Sub layer: Channel allocation problem, Controlled Access, Channelization, multiple access protocols, IEEE standard 802.3 & 802.11 for LANS and WLAN, high‐speed LANs, Token ring, Token Bus, FDDI based LAN, Network Devices‐repeaters, hubs, switches bridges.",
        Unit3: "Network Layer: Design issues, Routing algorithms, Congestion control algorithms, Host to Host Delivery: Internetworking, addressing and routing, IP addressing (class full & Classless), Subnet, Network Layer Protocols: ARP, IPV4, ICMP, IPV6 ad ICMPV6.",
        Unit4: "Transport Layer: Process to Process Delivery: UDP; TCP, congestion control and Quality of service. Application Layer: Client Server Model, Socket Interface, Domain Name System (DNS): Electronic Mail (SMTP), file transfer (FTP), HTTP and WWW."
      },
      "Design Analysis and Algorithms": {
        Unit1: "Asymptotic notations for time and space complexity, Methods for solving Recurrence relations, Brief Review of Graphs, Sets and disjoint sets, union, sorting and searching algorithms and their analysis in terms of space and time complexity. Divide and Conquer: General method, binary search, merge sort, Quick sort, selection sort, Strassen's matrix multiplication algorithms and analysis of algorithms for these problems.",
        Unit2: "Greedy Method: General method, knapsack problem, Huffman Codes, job sequencing with deadlines, minimum spanning trees, single souce paths and analysis of these problems. Back Tracking: General method, 8 queen's problem, graph colouring, Hamiltonian cycles, and analysis of these problems.",
        Unit3: "Dynamic Programming: Ingredients of Dynamic Programming. Matrix Chain Multiplication, Longest common subsequence and optimal binary search trees problems, 0‐1 knapsack problem, Traveling salesperson problem, Floyd Warshall algorithm. Branch and Bound: Method, O/I knapsack and traveling salesperson problem",
        Unit4: "String Matching: The naïve String Matching algorithm, The Rabin‐Karp Algorithm, String Matching with finite automata, The Knuth‐Morris Pratt algorithm. Computational Complexity: Basic Concepts, Polynomial vs Non‐Polynomial Complexity, NP‐ hard & NP‐complete classes. Approximation Algorithms Flow and Sorting Network:, Ford‐ Fulkerson method, Maximum bipartite matching, Sorting Networks, Comparison network, Zero‐ one principle, Bitonic sorting network, merging network"
      },
      "Economics for Engineers": {
        Unit1: "Introduction: Economics Definition, Basic economic problems, Resource constraints and welfare maximization. Micro and Macro economics. Production Possibility Curve. Circular flow of economic activities. Basics of Demand, Supply and Equilibrium: Demand side and supply side of the market. Factors affecting demand & supply. Elasticity of demand & supply – price, income and cross‐price elasticity. Market equilibrium price.",
        Unit2: "Theory of Consumer Choice: Theory of Utility and consumer's equilibrium. Indifference Curve analysis, Budget Constraints, Consumer Equilibrium. Demand forecasting: Regression Technique, Time‐series, Smoothing Techniques: Exponential, Moving Averages Method",
        Unit3: "Cost Theory and Analysis: Nature and types of cost, Cost functions‐ short run and long run, Economies and diseconomies of scale. Market Structure: Market structure and degree of competition. Perfect competition, Monopoly, Monopolistic competition, Oligopoly",
        Unit4: "National Income Accounting: Overview of Macroeconomics, Basic concepts of National Income Accounting. Macro Economics Issues: Introduction to Business Cycle, Inflation‐causes, consequences and remedies: Monetary and Fiscal policy."
      },
      "Operating Systems": {
        Unit1: "Introduction: What is an Operating System, Simple Batch Systems, Multiprogrammed Batches systems, Time Sharing Systems, Personal‐computer systems, Parallel systems, Distributed Systems, Real‐Time Systems, OS – A Resource Manager. Processes: Introduction, Process states, process management, Interrupts, Interprocess Communication. Threads: Introduction, Thread states, Thread Operation, Threading Models. Processor Scheduling: Scheduling levels, preemptive vs no preemptive scheduling, priorities, scheduling objective, scheduling criteria, scheduling algorithms, demand scheduling, real time scheduling.",
        Unit2: "Process Synchronization: Mutual exclusion, software solution to Mutual exclusion problem, hardware solution to Mutual exclusion problem, semaphores, Critical section problems. Case study on Dining philosopher problem, Barber shop problem etc. Memory Organization & Management: Memory Organization, Memory Hierarchy, Memory Management Strategies, Contiguous versus non‐ Contiguous memory allocation, Partition Management Techniques, Logical versus Physical Address space, swapping, Paging, Segmentation, Segmentation with Paging Virtual Memory: Demand Paging, Page Replacement, Page‐replacement Algorithms, Performance of Demand Paging, Thrashing, Demand Segmentation, and Overlay Concepts.",
        Unit3: "Deadlocks: examples of deadlock, resource concepts, necessary conditions for deadlock, deadlock solution, deadlock prevention, deadlock avoidance with Bankers algorithms, deadlock detection, deadlock recovery. Device Management: Disk Scheduling Strategies, Rotational Optimization, System Consideration, Caching and Buffering.",
        Unit4: "File System: Introduction, File Organization, Logical File System, Physical File System, File Allocation strategy, Free Space Management, File Access Control, Data Access Techniques, Data Integrity Protection, Case study on file system viz FAT32, NTFS, Ext2/Ext3 etc."
      },
      "Software Engineering": {
        Unit1: "Introduction: Introduction to Software Engineering, Importance of software engineering as a discipline, Software applications, Software Crisis, Software Processes & Characteristics, Software life cycle models, Waterfall, Prototype, Evolutionary and Spiral Models. Software Requirements Analysis & Specifications: Requirement engineering, Functional and non‐functional requirements, User requirements, System requirements, requirement elicitation techniques like FAST, QFD & Use case approach, requirements analysis using DFD, Data dictionaries & ER Diagrams, Requirements documentation, Nature of SRS, Characteristics & organization of SRS, Requirement Management, IEEE Std. for SRS.",
        Unit2: "Software Project Planning: Size Estimation like lines of Code & Function Count, Cost Estimation Models, COCOMO, Putnam resource allocation model, Validating Software Estimates, Risk Management. Software Design: Cohesion & Coupling, Classification of Cohesiveness & Coupling, Function Oriented Design, Object Oriented Design, User Interface Design.",
        Unit3: "Software Metrics: Software measurements: What & Why, Token Count, Halstead Software Science Measures, Data Structure Metrics, Information Flow Metrics. Software Reliability: Importance, Hardware Reliability & Software Reliability, Failure and Faults, Reliability Models‐ Basic Model, Logarithmic Poisson Model, Software Quality Models, CMM & ISO 9001.",
        Unit4: "Software Testing: Testing process, Functional testing: Boundary value analysis, Equivalence class testing, Decision table testing, Cause effect graphing, Structural testing: Path testing, Data flow and mutation testing, unit testing, integration and system testing, Debugging, Testing Tools & Standards. Software Maintenance: Management of Maintenance, Maintenance Process, Maintenance Models, Regression Testing, Reverse Engineering, Software Re‐engineering, Configuration Management, Documentation."
      }
    }
  }
};


const SyllabusExplorer: React.FC = () => {
  const [currentView, setCurrentView] = useState<"home" | "subjects" | "syllabus">("home");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // 🔹 Home Component
  const Home = () => {
    const handleSubmit = () => {
      if (selectedBranch && selectedSemester) {
        setCurrentView("subjects");
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Syllabus Explorer
              </h1>
              <p className="text-gray-600">
                Select your branch and semester to get started
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch
                </label>
                <select
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  value={selectedBranch}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select branch</option>
                  <option value="CSE">Computer Science & Engineering</option>
                  <option value="IT">Information Technology</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="EEE">Electrical & Electronics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semester
                </label>
                <select
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  value={selectedSemester}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select semester</option>
                  <option value="1st Sem">1st Semester</option>
                  <option value="2nd Sem">2nd Semester</option>
                  <option value="3rd Sem">3rd Semester</option>
                  <option value="4th Sem">4th Semester</option>
                  <option value="5th Sem">5th Semester</option>
                  <option value="6th Sem">6th Semester</option>
                  <option value="7th Sem">7th Semester</option>
                  <option value="8th Sem">8th Semester</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!selectedBranch || !selectedSemester}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 🔹 Subjects Component
  const Subjects = () => {
    const subjects = data[selectedBranch]?.[selectedSemester]
      ? Object.keys(data[selectedBranch][selectedSemester])
      : [];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-8">
                <button
                  onClick={() => setCurrentView("home")}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {selectedBranch} - {selectedSemester}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Choose a subject to view syllabus
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {subjects.length === 0 ? (
                  <p className="text-gray-500 text-center col-span-full">
                    Syllabus not available for {selectedBranch} -{" "}
                    {selectedSemester}
                  </p>
                ) : (
                  subjects.map((subject: string, i: number) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSelectedSubject(subject);
                        setCurrentView("syllabus");
                      }}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl cursor-pointer hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 group"
                    >
                      <div className="flex items-center">
                        <BookOpen className="w-6 h-6 text-white mr-3 group-hover:scale-110 transition-transform" />
                        <h3 className="text-white font-semibold text-lg leading-tight">
                          {subject}
                        </h3>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 🔹 Syllabus Component
  const Syllabus = () => {
    const [openUnit, setOpenUnit] = useState<string | null>(null);
    const syllabus =
      data[selectedBranch]?.[selectedSemester]?.[selectedSubject] ?? {};

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-8">
                <button
                  onClick={() => setCurrentView("subjects")}
                  className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {selectedSubject}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {selectedBranch} - {selectedSemester}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.keys(syllabus).map((unit: string, i: number) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <div
                      className="flex justify-between items-center p-6 bg-gradient-to-r from-gray-50 to-gray-100 cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
                      onClick={() =>
                        setOpenUnit(openUnit === unit ? null : unit)
                      }
                    >
                      <h3 className="text-xl font-semibold text-gray-800">
                        {unit}
                      </h3>
                      <div className="transform transition-transform duration-200">
                        {openUnit === unit ? (
                          <ChevronUp className="w-6 h-6 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                    </div>

                    {openUnit === unit && (
                      <div className="p-6 bg-white animate-in slide-in-from-top duration-300">
                        <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                          {syllabus[unit]
                            .split(",")
                            .map((point: string, idx: number) => (
                              <li key={idx}>{point.trim()}</li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 🔹 Render current view
  return (
    <div>
      {currentView === "home" && <Home />}
      {currentView === "subjects" && <Subjects />}
      {currentView === "syllabus" && <Syllabus />}
    </div>
  );
};

export default SyllabusExplorer;
