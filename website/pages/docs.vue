<template>
  <div class="bg-darker min-h-screen text-green-400 font-mono">
    <div class="container mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8">
      <div class="p-2 sm:p-4 lg:p-6">
        
        <!-- Header -->
        <div class="mb-6 sm:mb-8">
          <h1 class="text-xl sm:text-2xl font-bold text-green-400 mb-3 sm:mb-4">
            <span class="text-red-400">[</span>DOCUMENTATION<span class="text-red-400">]</span>
          </h1>
          <pre class="text-sm text-gray-400 mb-4">
Access Level: <span class="text-red-400">PUBLIC</span>
Documentation Status: <span class="text-green-400">ACTIVE</span>
Last Updated: <span class="text-yellow-400">{{ new Date().toISOString().split('T')[0] }}</span>
          </pre>
        </div>

        <!-- Navigation -->
        <div class="mb-6 sm:mb-8">
          <h2 class="text-lg sm:text-xl font-bold text-green-400 mb-3 sm:mb-4">
            <span class="text-red-400">[</span>DOCUMENTATION_SECTIONS<span class="text-red-400">]</span>
          </h2>
          <div class="bg-dark border border-gray-600 p-3 sm:p-4">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="doc in availableDocs"
                :key="doc.slug"
                @click="activeDoc = doc.slug"
                class="btn btn-outline text-xs"
                :class="{ 'text-green-400 border-green-400': activeDoc === doc.slug }"
              >
                {{ doc.title.toUpperCase() }}
              </button>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div v-if="activeDocContent" class="mb-6 sm:mb-8">
          <h2 class="text-lg sm:text-xl font-bold text-green-400 mb-3 sm:mb-4">
            <span class="text-red-400">[</span>{{ activeDocContent.title.toUpperCase() }}<span class="text-red-400">]</span>
          </h2>
          <div class="bg-dark border border-gray-600">
            <div class="border-b border-gray-600 p-4 bg-darker">
              <div class="text-sm font-bold text-green-400">CONTENT_VIEWER</div>
            </div>
            <div class="p-4">
              <div class="prose prose-invert max-w-none text-sm">
                <div v-html="renderedContent" class="space-y-4"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Content Message -->
        <div v-else class="mb-6 sm:mb-8">
          <div class="bg-dark border border-gray-600 p-4 text-center">
            <div class="text-red-400 mb-2">[NO_DOCUMENTATION_LOADED]</div>
            <div class="text-xs text-muted">Select a documentation section from above</div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="mb-6 sm:mb-8">
          <h2 class="text-lg sm:text-xl font-bold text-green-400 mb-3 sm:mb-4">
            <span class="text-red-400">[</span>QUICK_LINKS<span class="text-red-400">]</span>
          </h2>
          <div class="bg-dark border border-gray-600 p-3 sm:p-4">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <span class="text-green-400 text-xs">→</span>
                <a href="https://github.com/adhikara13/EvilMutex" target="_blank" class="text-sm text-green-400 hover:text-yellow-400 transition-colors">
                  GITHUB_REPOSITORY
                </a>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-green-400 text-xs">→</span>
                <a href="https://github.com/adhikara13/EvilMutex/issues" target="_blank" class="text-sm text-green-400 hover:text-yellow-400 transition-colors">
                  REPORT_ISSUES
                </a>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-green-400 text-xs">→</span>
                <a href="mailto:contact@evilmutex.org" class="text-sm text-green-400 hover:text-yellow-400 transition-colors">
                  CONTACT_DEVELOPERS
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'

// SEO
useSeoMeta({
  title: 'Documentation - EvilMutex',
  description: 'Learn how to contribute to EvilMutex and understand our malware mutex signature schema.',
  keywords: 'documentation, contributing, schema, malware, mutex, threat intelligence'
})

interface DocFile {
  slug: string
  title: string
  content: string
}

const activeDoc = ref('contributing')

// Static documentation data - this will be replaced with dynamic loading
const docsData: DocFile[] = [
  {
    slug: 'contributing',
    title: 'Contributing Guide',
    content: `# Contributing to EvilMutex

Welcome! We're excited to have you contribute to our malware mutex intelligence platform.

## Quick Start

1. **Fork** the repository
2. **Create** a new branch
3. **Add** your malware signatures or improvements
4. **Test** locally with \`npm run dev\`
5. **Submit** a pull request

## Adding Malware Signatures

### Simple Structure
Just put your YAML file directly in the \`signatures/\` folder:
- \`signatures/wannacry.yaml\`
- \`signatures/lockbit.yaml\`
- \`signatures/emotet.yaml\`

### File Naming
Use lowercase with hyphens: \`wannacry.yaml\`, \`lockbit.yaml\`

### YAML Template
\`\`\`yaml
malware_info:
  family: "MalwareName"
  aliases: ["Alias1", "Alias2"]
  description: "Brief description"
  first_seen: "2023"

category: "ransomware"  # or "rat", "trojan", "other"
primary_tags: ["windows", "encryption", "bitcoin"]

mutexes:
  - name: "MutexNameHere"
    references:
      - "https://source1.com"
      - "https://source2.com"
    date_added: "2025-01-11"
    analyst: "@adhikara13"
\`\`\`

### Requirements
- **Exact mutex names** - Copy them exactly as they appear
- **Public sources** - Each mutex needs at least one reference
- **Your GitHub username** - In the analyst field
- **Today's date** - When you added it

## Code Changes

### Frontend (Website)
- Located in \`website/\` folder
- Uses Vue.js + TypeScript + Tailwind CSS
- Test with \`cd website && npm run dev\`

### Testing
Before submitting:
1. Run \`npm run dev\` to test locally
2. Check your data appears on the website
3. Try searching for your malware

## Pull Request Tips

- **Clear title** - "Add Cobalt Strike mutex signatures"
- **Explain what you added** - Brief description
- **Link sources** - Where you found the mutex info
- **Keep it focused** - One malware family per PR is ideal

## What We're Looking For

### High Priority
- **New malware families** - Especially recent ones
- **Missing mutexes** - Add to existing families
- **Better sources** - More recent/detailed references

### Medium Priority
- **UI improvements** - Better search, filters, layout
- **Documentation** - Clearer guides and examples
- **Bug fixes** - Anything broken or confusing

## Need Help?

- **Schema details**: Check the Schema Documentation tab
- **Technical setup**: See [README.md](https://github.com/adhikara13/EvilMutex)
- **Questions**: Open an issue with the "question" label

---

**Thanks for helping make malware research better!**`
  },
  {
    slug: 'schema',
    title: 'Schema Documentation',
    content: `# EvilMutex YAML Schema Documentation

This document describes the YAML schema used for malware mutex signatures in the EvilMutex project.

## Overview

The EvilMutex YAML schema is designed to capture comprehensive information about malware mutex signatures. Each YAML file represents a malware family and contains:

- **Metadata** - Family information, aliases, threat actors
- **Classification** - Category and tags for organization
- **Mutex signatures** - The actual mutex strings used by the malware
- **Attribution** - Source references and analyst information

## Schema Structure

\`\`\`yaml
# Required: Malware family metadata
malware_info:
  family: string (required)
  aliases: array of strings (optional)
  description: string (required)
  threat_actor: string (optional)
  first_seen: string (optional)

# Required: Classification
category: string (required)
primary_tags: array of strings (required)

# Required: Mutex signatures
mutexes:
  - name: string (required)
    references: array of strings (required)
    date_added: string (required, YYYY-MM-DD format)
    analyst: string (required)
    notes: string (optional)
    confidence: string (optional)
    status: string (optional)
\`\`\`

## Field Definitions

### malware_info Section

#### \`family\` (required)
- **Type**: String
- **Description**: The primary name of the malware family
- **Format**: Proper case (e.g., "WannaCry", "Agent Tesla")
- **Example**: \`"Conti"\`

#### \`aliases\` (optional)
- **Type**: Array of strings
- **Description**: Alternative names for the malware family
- **Format**: Array of strings in proper case
- **Example**: \`["Conti2.0", "Conti Ryuk", "Conti Locker"]\`

#### \`description\` (required)
- **Type**: String
- **Description**: Brief description of the malware family
- **Format**: 1-3 sentences describing the malware's purpose and characteristics
- **Example**: \`"Conti is a ransomware-as-a-service (RaaS) operation that was active from 2019 to 2022."\`

#### \`threat_actor\` (optional)
- **Type**: String
- **Description**: Associated threat actor or group
- **Format**: Group name or designation
- **Example**: \`"Conti Group (Wizard Spider)"\`

#### \`first_seen\` (optional)
- **Type**: String
- **Description**: Year when the malware was first observed
- **Format**: YYYY (4-digit year)
- **Example**: \`"2019"\`

### Classification Fields

#### \`category\` (required)
- **Type**: String
- **Description**: Primary category of the malware
- **Allowed Values**:
  - \`"ransomware"\` - Ransomware families
  - \`"rat"\` - Remote Access Trojans
  - \`"trojan"\` - Banking trojans and other malware
  - \`"other"\` - Miscellaneous malware
- **Example**: \`"ransomware"\`

#### \`primary_tags\` (required)
- **Type**: Array of strings
- **Description**: Tags describing the malware's characteristics
- **Format**: Lowercase with underscores
- **Common Tags**:
  - \`"ransomware_as_a_service"\`
  - \`"double_extortion"\`
  - \`"file_encryption"\`
  - \`"data_theft"\`
  - \`"banking_trojan"\`
  - \`"keylogger"\`
  - \`"credential_harvesting"\`
  - \`"remote_access"\`
  - \`"botnet"\`
  - \`"persistence"\`
- **Example**: \`["ransomware_as_a_service", "double_extortion", "file_encryption"]\`

### Mutex Entries

#### \`name\` (required)
- **Type**: String
- **Description**: The exact mutex string used by the malware
- **Format**: Exact string as it appears in the malware
- **Example**: \`"kjsidugidf99439"\`

#### \`references\` (required)
- **Type**: Array of strings
- **Description**: URLs to public sources documenting this mutex
- **Format**: Valid HTTP/HTTPS URLs
- **Minimum**: At least one reference required
- **Example**: \`["https://github.com/PMC-Cyber/Malware_Famly"]\`
- **Validation**: Must be valid HTTP/HTTPS URLs
- **References**: Can include:
  - Research papers
  - Blog posts
  - Malware analysis reports
  - Security vendor advisories
  - Academic publications
  - Threat intelligence feeds

#### \`date_added\` (required)
- **Type**: String
- **Description**: Date when this mutex was added to the database
- **Format**: YYYY-MM-DD (ISO 8601 date format)
- **Example**: \`"2025-01-09"\`

#### \`analyst\` (required)
- **Type**: String
- **Description**: GitHub username of the analyst who added this entry
- **Format**: @username
- **Example**: \`"@adhikara13"\`

## Complete Example

\`\`\`yaml
# WannaCry Ransomware Mutex Intelligence
# Comprehensive signature file for WannaCry ransomware

malware_info:
  family: "WannaCry"
  aliases: ["WannaCrypt", "WCry", "Wana Decrypt0r"]
  description: "WannaCry is a ransomware worm that spread rapidly across the globe in May 2017, exploiting the EternalBlue vulnerability. It encrypted files and demanded Bitcoin payments for decryption."
  threat_actor: "Lazarus Group (suspected)"
  first_seen: "2017"

category: "ransomware"
primary_tags: ["worm", "file_encryption", "eternalblue_exploit", "bitcoin_ransom", "global_outbreak"]

mutexes:
  - name: "MsWinZonesCacheCounterMutexA"
    references:
      - "https://securelist.com/wannacry-ransomware-used-in-widespread-attacks-all-over-the-world/78351/"
      - "https://blog.malwarebytes.com/threat-analysis/2017/05/wannacry-ransomware/"
    date_added: "2025-01-09"
    analyst: "@security_researcher"
\`\`\``
  }
]

// Available documentation files
const availableDocs = computed(() => {
  return docsData.map(doc => ({
    slug: doc.slug,
    title: doc.title
  }))
})

// Current active document content
const activeDocContent = computed(() => {
  return docsData.find(doc => doc.slug === activeDoc.value)
})

// Render markdown content
const renderedContent = computed(() => {
  if (!activeDocContent.value) return ''
  
  // Configure marked for security
  marked.setOptions({
    breaks: true,
    gfm: true
  })
  
  // Simple markdown rendering without custom renderer
  const html = marked.parse(activeDocContent.value.content) as string
  
  // Apply custom styling classes
  return html
    .replace(/<h1>/g, '<h1 class="text-lg font-bold text-green-400 mb-3">')
    .replace(/<h2>/g, '<h2 class="text-base font-bold text-green-400 mb-3">')
    .replace(/<h3>/g, '<h3 class="text-sm font-bold text-green-400 mb-3">')
    .replace(/<h4>/g, '<h4 class="text-xs font-bold text-green-400 mb-3">')
    .replace(/<h5>/g, '<h5 class="text-xs font-bold text-green-400 mb-3">')
    .replace(/<h6>/g, '<h6 class="text-xs font-bold text-green-400 mb-3">')
    .replace(/<p>/g, '<p class="text-muted mb-3">')
    .replace(/<code>/g, '<code class="bg-darker px-2 py-1 rounded text-xs text-green-400">')
    .replace(/<pre>/g, '<pre class="bg-darker p-4 rounded border border-gray-600 overflow-x-auto mb-4">')
    .replace(/<pre><code>/g, '<pre class="bg-darker p-4 rounded border border-gray-600 overflow-x-auto mb-4"><code class="text-sm text-green-400">')
    .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 ml-4 text-muted">')
    .replace(/<ol>/g, '<ol class="list-decimal list-inside space-y-2 ml-4 text-muted">')
    .replace(/<li>/g, '<li class="text-muted">')
    .replace(/<a href=/g, '<a class="text-green-400 hover:text-yellow-400 transition-colors underline" target="_blank" href=')
    .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-green-400 pl-4 italic text-muted mb-3">')
})
</script> 