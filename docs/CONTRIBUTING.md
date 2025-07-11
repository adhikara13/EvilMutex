# Contributing to EvilMutex

Welcome! We're excited to have you contribute to our malware mutex intelligence platform.

## Quick Start

1. **Fork** the repository
2. **Create** a new branch
3. **Add** your malware signatures or improvements
4. **Test** locally with `npm run dev`
5. **Submit** a pull request

## Adding Malware Signatures

### Simple Structure
Just put your YAML file directly in the `signatures/` folder:
- `signatures/wannacry.yaml`
- `signatures/lockbit.yaml`
- `signatures/emotet.yaml`

### File Naming
Use lowercase with hyphens: `wannacry.yaml`, `lockbit.yaml`

### YAML Template
```yaml
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
```

### Requirements
- **Exact mutex names** - Copy them exactly as they appear
- **Public sources** - Each mutex needs at least one reference
- **Your GitHub username** - In the analyst field
- **Today's date** - When you added it

## Code Changes

### Frontend (Website)
- Located in `website/` folder
- Uses Vue.js + TypeScript + Tailwind CSS
- Test with `cd website && npm run dev`

### Testing
Before submitting:
1. Run `npm run dev` to test locally
2. Check your data appears on the website
3. Try searching for your malware

## Pull Request Tips

- **Clear title** - "Add Cobalt Strike mutex signatures"
- **Explain what you added** - Brief description
- **Link sources** - Where you found the mutex info
- **Keep it focused** - One malware family per PR is ideal

## Bug Reports

When reporting issues:
1. **What happened?** - Brief description
2. **Steps to reproduce** - How to trigger the bug
3. **Expected vs actual** - What should happen vs what did happen
4. **Browser/OS** - Your system info

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

- **Schema details**: Check [SCHEMA.md](SCHEMA.md)
- **Technical setup**: See [README.md](../README.md)
- **Questions**: Open an issue with the "question" label

## Recognition

All contributors are credited in the website and your GitHub username appears next to your contributions!

---

**Thanks for helping make malware research better!** 