# EvilMutex

<!-- BADGES START -->
![CI/CD Pipeline](https://github.com/adhikara13/EvilMutex/actions/workflows/ci-cd.yml/badge.svg) 
![PR Validation](https://github.com/adhikara13/EvilMutex/actions/workflows/pr-validation.yml/badge.svg) 
![Malware Families](https://img.shields.io/badge/Malware%20Families-6-red) 
![Total Mutexes](https://img.shields.io/badge/Total%20Mutexes-7-blue) 
![Hosted on Cloudflare](https://img.shields.io/badge/Hosted%20on-Cloudflare%20Pages-orange)

**Last Updated:** 2025-07-11 20:20:29 UTC
<!-- BADGES END -->

**Malware Mutex Intelligence Platform**

A comprehensive database of malware mutex signatures for threat intelligence, detection engineering, and cybersecurity research.

## 🎯 What is EvilMutex?

Mutexes (mutual exclusion objects) are used by malware to prevent multiple instances from running simultaneously. Each malware family typically uses unique mutex names, making them excellent fingerprints for threat identification and detection.

## 🔍 Current Database

- **1 Malware Family** across multiple categories
- **5 Mutex Signatures** with full metadata  
- **Categories:** Ransomware, RATs, Trojans
- **Regular Updates** from the security community

## 🚀 Quick Start

Visit the live platform: **[evilmutex.org](https://evilmutex.org)**

### Local Development

```bash
# Clone the repository
git clone https://github.com/adhikara13/evilmutex.git
cd evilmutex

# Install dependencies
cd website
npm install

# Start development server
npm run dev
```

## 🔧 Tech Stack

- **Frontend:** Nuxt.js 3, Vue.js, TypeScript, Tailwind CSS
- **Data:** YAML signatures → JSON processing
- **Deployment:** Cloudflare Pages

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Add your malware signatures in YAML format
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website:** [evilmutex.org](https://evilmutex.org)
- **GitHub:** [github.com/adhikara13/evilmutex](https://github.com/adhikara13/evilmutex)
- **Issues:** [github.com/adhikara13/evilmutex/issues](https://github.com/adhikara13/evilmutex/issues)

---

*Built with ❤️ for the cybersecurity community* 