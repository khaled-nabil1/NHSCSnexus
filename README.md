# NHSCS Nexus

![NHSCS Nexus](public/logo.svg)

A centralized platform for accessing and searching study resources for the National Higher School of Cyber Security. This project aims to streamline the process of finding and accessing course materials, making academic resources more accessible to students.

## 🌟 Features

- **Smart Search**: Real-time search through Google Drive files with instant results
- **Organized Structure**: Content categorized by cycles (Preparatory & Superior) and semesters
- **Cyberpunk UI**: Modern, responsive design with a cybersecurity theme
- **Quick Navigation**: Easy access to different sections with smooth scrolling
- **Mobile Friendly**: Fully responsive design with a mobile-optimized interface

## 🚀 Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **API Integration**: Google Drive API
- **Routing**: React Router v6
- **Icons**: Custom SVG icons
- **Fonts**: Share Tech Mono

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/khaled-nabil1/nhscs-nexus1.git
cd nhscs-nexus1
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Variables**

```bash
cp .env.example .env
# Add your Google Drive API key to the .env file
```

4. **Run the development server**

```bash
npm run dev
```

## 📦 Project Structure

nhscs-nexus1/
├── src/
│ ├── components/
│ │ ├── Hero.jsx # Landing section
│ │ ├── Navbar.jsx # Navigation bar
│ │ ├── SearchBar.jsx # Drive search functionality
│ │ ├── CategorySection.jsx # Cycle sections
│ │ └── Footer.jsx # Footer with social links
│ ├── pages/
│ │ └── Home.jsx # Main page
│ ├── assets/ # Images and static files
│ └── App.jsx # Root component
├── public/
│ └── logo.svg # Site logo
└── docs/ # Documentation


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Contact

Khaled Nabil
- X (Twitter): [@N_Khaled74](https://x.com/N_Khaled74)
- LinkedIn: [Khaled Nabil](https://www.linkedin.com/in/khaled-nabil-4894a8340/)
- Email: n.khaled@enscs.edu.dz

## 🙏 Acknowledgments

- National Higher School of Cyber Security for the resources
- All contributors who help maintain and improve this project
- The cybersecurity community for continuous support

---
Made with ❤️ for NHSCS students