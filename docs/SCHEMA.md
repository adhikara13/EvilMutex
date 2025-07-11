# EvilMutex YAML Schema Documentation

This document describes the YAML schema used for malware mutex signatures in the EvilMutex project. All signature files must conform to this schema to ensure consistency and enable proper data processing.

## Table of Contents

- [Overview](#overview)
- [Schema Structure](#schema-structure)
- [Field Definitions](#field-definitions)
- [Examples](#examples)
- [Validation Rules](#validation-rules)
- [Best Practices](#best-practices)
- [Common Mistakes](#common-mistakes)

## Overview

The EvilMutex YAML schema is designed to capture comprehensive information about malware mutex signatures. Each YAML file represents a malware family and contains:

- **Metadata** - Family information, aliases, threat actors
- **Classification** - Category and tags for organization
- **Mutex signatures** - The actual mutex strings used by the malware
- **Attribution** - Source references and analyst information

## Schema Structure

```yaml
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
```

## Field Definitions

### malware_info Section

#### `family` (required)
- **Type**: String
- **Description**: The primary name of the malware family
- **Format**: Proper case (e.g., "WannaCry", "Agent Tesla")
- **Example**: `"Conti"`

#### `aliases` (optional)
- **Type**: Array of strings
- **Description**: Alternative names for the malware family
- **Format**: Array of strings in proper case
- **Example**: `["Conti2.0", "Conti Ryuk", "Conti Locker"]`

#### `description` (required)
- **Type**: String
- **Description**: Brief description of the malware family
- **Format**: 1-3 sentences describing the malware's purpose and characteristics
- **Example**: `"Conti is a ransomware-as-a-service (RaaS) operation that was active from 2019 to 2022."`

#### `threat_actor` (optional)
- **Type**: String
- **Description**: Associated threat actor or group
- **Format**: Group name or designation
- **Example**: `"Conti Group (Wizard Spider)"`

#### `first_seen` (optional)
- **Type**: String
- **Description**: Year when the malware was first observed
- **Format**: YYYY (4-digit year)
- **Example**: `"2019"`

### Classification Fields

#### `category` (required)
- **Type**: String
- **Description**: Primary category of the malware
- **Allowed Values**:
  - `"ransomware"` - Ransomware families
  - `"rat"` - Remote Access Trojans
  - `"trojan"` - Banking trojans and other malware
  - `"other"` - Miscellaneous malware
- **Example**: `"ransomware"`

#### `primary_tags` (required)
- **Type**: Array of strings
- **Description**: Tags describing the malware's characteristics
- **Format**: Lowercase with underscores
- **Common Tags**:
  - `"ransomware_as_a_service"`
  - `"double_extortion"`
  - `"file_encryption"`
  - `"data_theft"`
  - `"banking_trojan"`
  - `"keylogger"`
  - `"credential_harvesting"`
  - `"remote_access"`
  - `"botnet"`
  - `"persistence"`
- **Example**: `["ransomware_as_a_service", "double_extortion", "file_encryption"]`

### Mutex Entries

#### `name` (required)
- **Type**: String
- **Description**: The exact mutex string used by the malware
- **Format**: Exact string as it appears in the malware
- **Example**: `"kjsidugidf99439"`

#### `references` (required)
- **Type**: Array of strings
- **Description**: URLs to public sources documenting this mutex
- **Format**: Valid HTTP/HTTPS URLs
- **Minimum**: At least one reference required
- **Example**: `["https://github.com/PMC-Cyber/Malware_Famly"]`
- **Validation**: Must be valid HTTP/HTTPS URLs
- **References**: Can include:
  - Research papers
  - Blog posts
  - Malware analysis reports
  - Security vendor advisories
  - Academic publications
  - Threat intelligence feeds

**Example**:
```yaml
references:
  - "https://evilmutex.org/malware-analysis"
  - "https://malpedia.caad.fkie.fraunhofer.de/details/win.malware"
  - "https://unit42.paloaltonetworks.com/malware-analysis/"
```

#### `date_added` (required)
- **Type**: String
- **Description**: Date when this mutex was added to the database
- **Format**: YYYY-MM-DD (ISO 8601 date format)
- **Example**: `"2025-01-09"`

#### `analyst` (required)
- **Type**: String
- **Description**: GitHub username of the analyst who added this entry
- **Format**: @username
- **Example**: `"@adhikara13"`

#### `notes` (optional)
- **Type**: String
- **Description**: Additional context or notes about this mutex
- **Format**: Free text
- **Example**: `"Used in later versions after 2021"`

#### `confidence` (optional)
- **Type**: String
- **Description**: Confidence level in the mutex attribution
- **Allowed Values**: `"high"`, `"medium"`, `"low"`
- **Default**: `"high"` (if not specified)
- **Example**: `"high"`

#### `status` (optional)
- **Type**: String
- **Description**: Status of the mutex usage
- **Allowed Values**: `"active"`, `"deprecated"`, `"unconfirmed"`
- **Default**: `"active"` (if not specified)
- **Example**: `"active"`

## Examples

### Complete Example

```yaml
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
    notes: "Primary mutex used to prevent multiple infections"
    confidence: "high"
    status: "active"

  - name: "Global\\MsWinZonesCacheCounterMutexA0"
    references:
      - "https://www.fireeye.com/blog/threat-research/2017/05/wannacry-malware-profile.html"
    date_added: "2025-01-09"
    analyst: "@security_researcher"
    confidence: "high"
    status: "active"
```

### Minimal Example

```yaml
malware_info:
  family: "SimpleRAT"
  description: "Basic remote access trojan for educational purposes"

category: "rat"
primary_tags: ["remote_access", "basic_functionality"]

mutexes:
  - name: "SimpleRATMutex123"
    references:
      - "https://evilmutex.org/malware-analysis"
    date_added: "2025-01-09"
    analyst: "@analyst"
```

## Validation Rules

### File Level Validation

1. **YAML Syntax**: Must be valid YAML
2. **Required Fields**: All required fields must be present
3. **Data Types**: Fields must match specified types
4. **Reference URLs**: Must be valid HTTP/HTTPS URLs
5. **Date Format**: Dates must be in YYYY-MM-DD format

### Content Validation

1. **Unique Mutexes**: No duplicate mutex names within a file
2. **Valid Categories**: Category must be one of allowed values
3. **Analyst Format**: Must start with @ symbol
4. **URL Accessibility**: Reference URLs should be publicly accessible
5. **Reasonable Dates**: Dates should be realistic (not in the future)

### Automated Checks

The CI/CD pipeline automatically validates:
- YAML syntax and structure
- Required field presence
- Data type correctness
- URL format validation
- Date format validation

## Best Practices

### Research and Attribution

1. **Verify Sources**: Use reputable security research sources
2. **Multiple References**: Include multiple sources when possible
3. **Direct Attribution**: Credit original researchers when known
4. **Recent Sources**: Prefer recent and updated research

### Mutex Naming

1. **Exact Strings**: Copy mutex names exactly as they appear
2. **Case Sensitivity**: Maintain original case
3. **Special Characters**: Include all special characters
4. **No Modifications**: Don't clean or modify the strings

### Documentation

1. **Clear Descriptions**: Write concise but informative descriptions
2. **Context Notes**: Add notes for unusual or interesting mutexes
3. **Status Updates**: Mark deprecated or unconfirmed mutexes
4. **Confidence Levels**: Use appropriate confidence levels

### File Organization

1. **Logical Categories**: Place files in appropriate directories
2. **Consistent Naming**: Use lowercase with hyphens
3. **Single Family**: One malware family per file
4. **Complete Coverage**: Include all known mutexes

## Common Mistakes

### Schema Violations

❌ **Missing Required Fields**
```yaml
malware_info:
  family: "BadExample"
# Missing description and other required fields
```

✅ **Correct Structure**
```yaml
malware_info:
  family: "GoodExample"
  description: "Proper malware description"
category: "trojan"
primary_tags: ["example_tag"]
mutexes: []
```

### Formatting Issues

❌ **Incorrect Date Format**
```yaml
date_added: "Jan 9, 2025"  # Wrong format
```

✅ **Correct Date Format**
```yaml
date_added: "2025-01-09"   # ISO 8601 format
```

### Reference Problems

❌ **Invalid URLs**
```yaml
references:
  - "malware-analysis.txt"  # Not a valid URL
  - "ftp://evilmutex.org"   # Not HTTP/HTTPS
```

✅ **Valid References**
```yaml
references:
  - "https://evilmutex.org/research/analysis"
  - "https://github.com/researcher/report"
```

### Content Issues

❌ **Vague Descriptions**
```yaml
description: "Bad malware"  # Too vague
```

✅ **Detailed Descriptions**
```yaml
description: "Advanced persistent threat targeting financial institutions with keylogging capabilities"
```

## Schema Versioning

- **Current Version**: 1.0
- **Compatibility**: Backward compatible changes only
- **Updates**: Schema changes are documented in CHANGELOG.md

## Tools and Validation

### Local Validation

Use the built-in validation tools:
```bash
# Validate all YAML files
npm run validate-yaml

# Check specific file
npm run validate-yaml -- signatures/ransomware/wannacry.yaml
```

### IDE Support

Recommended tools:
- **VS Code**: YAML extension with schema validation
- **IntelliJ**: Built-in YAML support
- **Vim**: yaml-vim plugin

---

For questions about the schema or validation, please refer to the [Contributing Guide](CONTRIBUTING.md) or open an issue on GitHub. 