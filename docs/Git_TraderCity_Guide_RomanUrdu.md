# Git Guide for TraderCity (Roman Urdu Edition)

## Git ko kaise samjho?

Git = Time Machine + Backup System

Agar website toot jaye, file delete ho jaye, ya experiment fail ho jaye,
to Git tumhe purane point par wapas le ja sakta hai.

---

## 1. Current Status Check

```bash
git status
```

### Kya karta hai?

- Kon si files change hui hain
- Kon si delete hui hain
- Kon si new hain
- Kon si commit ke liye ready hain

### Yaad rakho

Agar kuch samajh na aaye:

```bash
git status
```

Ye sabse pehla command hai.

---

## 2. Changes Add Karna

```bash
git add .
```

### Simple Meaning

Git bhai, ye saare changes save karne ke liye ready hain.

### Dot (.) ka matlab

Current folder ke andar sab kuch add kar do.

---

## 3. Snapshot Save Karna

```bash
git commit -m "Added Hero Section"
```

### Simple Meaning

Project ka save point create karo.

Game save karne jaisa.

Agar baad me kuch toot gaya:

Isi point par wapas aa sakte ho.

---

## 4. Naya Experiment Start Karna

```bash
git checkout -b prototype-redesign
```

### Simple Meaning

Main website ko touch kiye bina
alag timeline bana lo.

Example:

master = stable website

prototype-redesign = crazy experiments

---

## 5. Branch Change Karna

```bash
git checkout master
```

Ya

```bash
git checkout prototype-redesign
```

### Simple Meaning

Ek timeline se dusri timeline me jump.

---

## 6. History Dekhna

```bash
git log --oneline
```

### Kya Milega?

Project ke saare save points.

Example:

```text
0186fe2 Hero V1 and Ecosystem V1
4db8e46 Initial commit from Create Next App
```

---

## 7. File Recover Karna

Agar file delete ho gayi:

```bash
git restore src/components/home/Hero.tsx
```

Ya sab recover:

```bash
git restore .
```

### Oops Command

Galti ho gayi?

Ye last commit wali state wapas le aata hai.

---

## 8. GitHub Par Upload

```bash
git push
```

### Meaning

Laptop -> GitHub

Cloud backup ready.

---

# TraderCity Workflow

## Naya Feature

```bash
git checkout -b feature-name
```

Code likho

```bash
git status
```

Sab sahi?

```bash
git add .
git commit -m "Added feature"
git push
```

---

# Real Example (Jo Humne Kiya)

Hero.tsx

Navbar.tsx

Ecosystem.tsx

delete kar diye.

Panic karne ki zarurat nahi.

Recover:

```bash
git checkout 0186fe2 -- src/components/home/Hero.tsx
```

Ya pura old version:

```bash
git checkout 0186fe2
```

Git ne file permanently nahi hatayi.

History me save hai.

---

# Golden Rules

### 1 Hour ka kaam hua?

Commit.

### Kuch delete karne wale ho?

Commit.

### Claude ka bada code paste karne wale ho?

Commit.

### Website finally chal rahi hai?

Commit.

### Naya experiment?

New Branch.

---

# Most Useful Commands Cheat Sheet

```bash
git status
git add .
git commit -m "message"
git log --oneline
git checkout -b branch-name
git checkout master
git restore .
git push
```

---

# Final Mindset

Git ko backup system mat samjho.

Git = Time Machine.

Jitna zyada use karoge,
utna fearless development kar paoge.
