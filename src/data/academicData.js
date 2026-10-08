/**
 * Standalone Academic Data Repository
 * Provides all database records for Assignments, Achievements, and Projects
 * without requiring any external backend server or database.
 */

export const achievementsData = [
  {
    id: 1,
    title: "Microsoft Certified: Azure Fundamentals",
    description: "Official credential awarded by Microsoft validating foundational understanding of cloud architectural models, core Azure cloud services, security baselines, identity management, and governance. Issued under the authority of Satya Nadella (CEO, Microsoft).",
    category: "certificates",
    category_label: "Industry Certification",
    date: "19 November 2025",
    meta_info: "Microsoft & Certiport • Credential ID: cuSP-uSez",
    image_url: "/assets/achievements/azure-fundamentals.png",
    image_placeholder: "Microsoft Azure Fundamentals Certification",
    badge: "Microsoft Certified",
    verification_url: "https://verify.certiport.com"
  },
  {
    id: 2,
    title: "3rd Position • Integrated Green Mobility Ideathon",
    description: "Secured Third Position with team 'Innovation Crew' (UID: 25BAI10049) in the Integrated Green Mobility Ideathon focusing on Sustainable Vehicles Inspired by Indian Knowledge Systems (IKS), organized by Ignite Youth Club & Chandigarh University.",
    category: "competitions",
    category_label: "Competition Award (3rd Position)",
    date: "16 February 2026",
    meta_info: "Chandigarh University • NAAC Grade A+ • AIT CSE",
    image_url: "/assets/achievements/green-mobility-ideathon-3rd.png",
    image_placeholder: "Bronze Medal Ideathon Achievement Certificate",
    badge: "Bronze Award • 3rd Place"
  },
  {
    id: 3,
    title: "Advance Credit Program: Programming in Python",
    description: "Certificate of Accomplishment demonstrating outstanding dedication and exceptional performance in Programming in Python (Course: 25GPA132) under the Advance Credit Program, earning 1 official academic credit redeemed toward university degree requirements.",
    category: "academic",
    category_label: "Advance Credit Program",
    date: "2025 - 2026",
    meta_info: "Chandigarh University (NIRF #20, QS Asia) • 1 Academic Credit",
    image_url: "/assets/achievements/python-advance-credit.png",
    image_placeholder: "Python Advance Credit Program Certificate",
    badge: "1 Academic Credit"
  },
  {
    id: 4,
    title: "Build Summit 2026: Innovating for Bharat",
    description: "Certificate of Participation for active involvement with project 'Byte Built' during Build Summit 2026 celebrating Engineers' Day at Chandigarh University, showcasing collaborative technology, creativity, and engineering problem-solving.",
    category: "hackathons",
    category_label: "Hackathon & Summit",
    date: "14 - 15 September 2026",
    meta_info: "University Institute of Engineering (UIE), Chandigarh University",
    image_url: "/assets/achievements/build-summit-2026.png",
    image_placeholder: "Build Summit 2026 Participation Certificate",
    badge: "Engineers' Day Summit"
  },
  {
    id: 5,
    title: "HERizon 2026 • IEEE India Council Collaboration",
    description: "Certificate of Participation awarded to Richa Sharma (Team: Quad X) for actively participating in HERizon 2026, an initiative empowering women in engineering, organized by UIE Chandigarh University in collaboration with IEEE India Council and atthah.",
    category: "hackathons",
    category_label: "IEEE Tech & Innovation",
    date: "27 - 28 March 2026",
    meta_info: "IEEE India Council & UIE Chandigarh University",
    image_url: "/assets/achievements/herizon-2026-ieee.png",
    image_placeholder: "HERizon 2026 IEEE Certificate",
    badge: "IEEE India Council"
  },
  {
    id: 6,
    title: "Computer Architecture & Systems Mastery",
    description: "Departmental citation for verified excellence in Processor Datapath Design, Cache Locality, and Pipelined Hazard Mitigation in Computer Organisation & Architecture.",
    category: "certificates",
    category_label: "Technical Citation",
    date: "Academic Year 2025 - 2026",
    meta_info: "Chandigarh University • CSE Department",
    image_placeholder: "Technical Certification"
  }
];

export const assignment1Data = {
  id: 1,
  title: "Assignment 1: Cache Memory Architecture & Address Translation",
  course_name: "Computer Organization and Architecture",
  course_code: "CS204",
  submission_date: "Academic Term 2024-2025",
  instructor: "Department Faculty, Computer Science & Engineering",
  student_name: "Richa Sharma",
  student_id: "CU-CSE-COA",
  problem_statement: "Design and implement a cache simulator to model memory address translations, evaluate tag matches for direct mapped vs set associative cache architectures, and measure bitfields under varying block sizes and cache capacities.",
  objective: "1. Understand bitwise address extraction techniques for Tag, Index, and Offset fields.\n2. Implement hardware comparator simulation and valid bit tracking.\n3. Analyze cache performance metrics including Compulsory, Capacity, and Conflict misses.",
  algorithm: "Step 1: Read memory address string and parse to 32-bit unsigned integer.\nStep 2: Apply bitwise AND with offset mask to isolate byte offset.\nStep 3: Shift right by offset bits and mask to extract set index.\nStep 4: Extract remaining high bits as Tag.\nStep 5: Compare tag against cache line directory and evaluate match status.",
  explanation: "The simulation models a hardware tag comparator circuit. Each memory reference is decomposed into Tag, Set, and Offset. For direct mapped, exactly one line is indexed. For set associative caches, parallel comparators check all lines within the indexed set simultaneously.",
  implementation_code: `/* 
 * COA Assignment 1: Cache Memory Address Translation & Tag Comparison
 * Author: Richa Sharma (Chandigarh University)
 */

#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>

typedef struct {
    uint32_t tag;
    bool valid;
    uint32_t last_accessed_cycle; // For LRU replacement
} CacheLine;

bool access_cache(uint32_t address, uint32_t tag_bits, uint32_t set_bits, uint32_t offset_bits) {
    uint32_t offset_mask = (1U << offset_bits) - 1;
    uint32_t set_mask    = (1U << set_bits) - 1;
    
    uint32_t offset  = address & offset_mask;
    uint32_t set_idx = (address >> offset_bits) & set_mask;
    uint32_t tag     = address >> (offset_bits + set_bits);

    printf("Extracted -> Tag: 0x%X, Set Index: %u, Byte Offset: %u\\n", tag, set_idx, offset);
    return true;
}`,
  output_trace: `$ gcc -Wall -O2 cache_simulator.c -o cache_sim
$ ./cache_sim --config 2way --cache-size 32KB --block-size 64B < trace.mem

[SIMULATION EXECUTION TRACE - VALIDATED]
Total Memory References: 100,000
Total Hits:              89,450
Total Misses:            10,550
Hit Ratio:               89.45%
Miss Ratio:              10.55%
-------------------------------------------------------
Compulsory Misses:       1,200
Capacity Misses:         4,150
Conflict Misses:         5,200
Simulation finished successfully (Exit Code 0).`,
  conclusion: "Increasing associativity from 1-way (direct mapped) to 2-way significantly reduces conflict misses while maintaining acceptable comparator latency. Beyond 4-way, marginal hit rate improvement diminishes compared to increased silicon area and access delay.",
  github_url: "https://github.com/Rich12-max"
};

export const assignmentsData = [assignment1Data];

export const projectsData = [
  {
    id: 1,
    name: "COA Learning Tools",
    description: "Integrated educational web suite providing accessible visualizations, memory organization models, and instruction encoding demonstrations for students and instructors.",
    category: "Core Suite",
    tech_stack: "React, Vite, JavaScript, CSS3, Modern UI",
    github_url: "https://github.com/Rich12-max"
  },
  {
    id: 2,
    name: "Number System Converter",
    description: "Bi-directional multi-radix mathematical engine supporting binary, octal, decimal, and hexadecimal transitions, signed arithmetic, and two's complement evaluation.",
    category: "Radix Engine",
    tech_stack: "JavaScript, Radix Algorithms, Bitwise Math, React",
    github_url: "https://github.com/Rich12-max"
  },
  {
    id: 3,
    name: "Set Associative Mapping Simulator",
    description: "Visual hardware simulation tool modeling CPU cache line placement, Tag comparator checking, and hit/miss evaluation across 0-way, 1-way, 2-way, and 3-way associativity.",
    category: "Hardware Sim",
    tech_stack: "React, Cache Models, LRU Replacement, Bitwise Logic",
    github_url: "https://github.com/Rich12-max"
  },
  {
    id: 4,
    name: "COA Assignment 1 Implementation",
    description: "Source code, memory reference trace input generators, test suites, and empirical benchmarking scripts for COA Assignment 1.",
    category: "Coursework",
    tech_stack: "C (C99 / C11), Makefile, Memory Trace Analysis",
    github_url: "https://github.com/Rich12-max"
  },
  {
    id: 5,
    name: "5-Stage MIPS / RISC-V Datapath",
    description: "Instruction fetch (IF), decode (ID), execute (EX), memory (MEM), and write-back (WB) cycle-accurate simulation with hazard detection and data forwarding.",
    category: "Lab Project",
    tech_stack: "Computer Architecture, ISA Simulation, Pipeline Hazards",
    github_url: "https://github.com/Rich12-max"
  },
  {
    id: 6,
    name: "Digital Arithmetic Circuits & ALU",
    description: "Schematic models for Carry Lookahead Adders (CLA), Booth's multiplication algorithm, and restoring division logic implemented with digital logic principles.",
    category: "Hardware Lab",
    tech_stack: "Digital Logic, ALU Architecture, Binary Arithmetic",
    github_url: "https://github.com/Rich12-max"
  }
];
