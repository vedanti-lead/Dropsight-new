# 🚀 Dropsight

**Dropsight** is an intelligent Product Success Analysis Dashboard built specifically for **dropshipping businesses**. It helps sellers make data-driven decisions by analyzing sales trends, customer reviews, and pricing. Dropsight calculates product success probability using Bayesian statistics and provides product recommendations using similarity metrics.

---

## 📊 Key Features

- ✅ **Product Success Probability** using **Bayes’ Theorem**
- 🧠 **Smart Similarity Recommendations** using **Cosine Similarity**
- ⚡ **Efficient Data Management** with **HashMaps** to store:
  - Product Prices
  - Sales Data
  - Customer Reviews
- 💡 Insightful dashboard to visualize product performance
- 🔐 Backend built with **Java + Spring Boot**
- 🌐 Frontend built with **TypeScript**

---

## 🛠️ Tech Stack

| Layer        | Technologies               |
|--------------|----------------------------|
| Frontend     | TypeScript, HTML, CSS      |
| Backend      | Java, Spring Boot          |
| Data Storage | HashMaps (in-memory store) |
| Algorithms   | Bayes’ Theorem, Cosine Similarity |

---

## 📦 Installation

### Prerequisites
- Java 17+
- Node.js 16+
- npm or yarn
- Maven

### Backend Setup (Spring Boot)
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run

