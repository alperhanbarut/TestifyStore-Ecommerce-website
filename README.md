# 🛍️ TestifyStore - E-Ticaret Uygulaması

TestifyStore, modern teknolojiler kullanılarak geliştirilmiş bir **React tabanlı e-ticaret uygulamasıdır**.  
Hızlı, ölçeklenebilir ve kullanıcı dostu bir alışveriş deneyimi sunmayı hedefler.

---

## 🚀 Özellikler

- 🔍 **Ürün Listeleme ve Filtreleme**  
- 🛒 **Sepet Yönetimi (Ekle, Çıkar, Güncelle)**  
- 🔔 **Kullanıcı Bildirimleri (Toastify)**  
- 📡 **JSON Server ile Mock API**  

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| **React** | Modern, component tabanlı kullanıcı arayüzü geliştirme kütüphanesi |
| **TypeScript** | JavaScript’in tip güvenli ve ölçeklenebilir versiyonu |
| **Vite** | Hızlı geliştirme ve derleme sağlayan modern frontend build aracı |
| **Tailwind CSS** | Utility-first yaklaşımıyla hızlı ve esnek stil oluşturma sağlayan CSS framework’ü |
| **MUI (Material UI)** | Hazır ve özelleştirilebilir React bileşenleri sunan UI kütüphanesi |
| **Shadcn UI** | Modern ve erişilebilir React UI bileşenleri |
| **Redux Toolkit** | Global state yönetimi için kullanılan sadeleştirilmiş Redux kütüphanesi |
| **React Router** | SPA (Single Page Application) için sayfa yönlendirme ve route yönetimi |
| **Axios** | API ve backend ile HTTP istekleri yapmak için |
| **JSON Server** | Mock API ve test verisi için |
| **React Toastify** | Kullanıcıya bildirim ve uyarı mesajları göstermek için |
| **GSAP** | Animasyon ve geçiş efektleri için güçlü JS kütüphanesi |
| **PostCSS** | CSS’i derleme ve dönüştürme işlemleri için |
| **Jest / Testing Library (opsiyonel)** | Birim ve entegrasyon testleri için |

---

## 📂 Proje Kurulumu

Projeyi kendi bilgisayarında çalıştırmak için:

```bash
# Reponun kopyasını al
git clone https://github.com/alperhanbarut/TestifyStore-Ecommerce-website.git

# Proje klasörüne gir
cd TestifyStore-Ecommerce-website

# Gerekli paketleri yükle
npm install

# JSON Server (fake API) çalıştır
npx json-server --watch db.json --port 5000

# Geliştirme sunucusunu başlat
npm run dev
