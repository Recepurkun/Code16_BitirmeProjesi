# Bursa Su Tüketimi

Seçilen ilce ve mahalleye göre aylik ve yillik olarak tuketilen su verilerini gosteren React ile gelistirilmis bir web sayfasi

## Cors hatasi yuzunden eklenti calistirmak gerekiyor. 
Herhangi bir şekilde cors'u bypass eden eklenti de kullanabilirsiniz.
[CORS-Unblock](https://chromewebstore.google.com/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino)

## Canli  -> https://code16-bitirme-projesi-recepurkun.vercel.app/

## Proje Videosu: [Video](https://www.youtube.com/watch?v=StO7cVBsdUA)

## Kullanilan Teknolojiler
> Harita icin:  [React Leaflet](https://react-leaflet.js.org/) <br>
> Iconlar icin: [React Icons](https://react-icons.github.io/react-icons/) <br>
> Yonlendirmeler icin: [React Router Dom](https://reactrouter.com/en/main/) <br>
> Css Kutuphanesi: [Bootstrap](https://getbootstrap.com/) 

## Datalar
Bursa Büyükşehir Belediyesinin Açık Veri Platformunda paylaştığı veriler -> [Acik Yesil](https://acikyesil.bursa.bel.tr/)

## Kullanimi
Görmek istediğiniz ilçe ve mahalleyi seçtikten sonra haritada o mahallenin sınırları <b>(Resim2)</b> çizilir. Sınırları çizilen mahallenin üstüne geldikten ve veriler yüklendikten sonra yıllık tüketim miktarlari gözükür. Daha detayli bilgi almak için <b>(Resim3)</b> mavi ikona tiklayin ve oradan da "Aylik Verileri görmek için tiklayin" butonuna tiklayin ve artık <b>(Resim4)</b> aşağıda gözüken verileri inceleyebilirsiniz.

## Ekran Görüntüleri

![Uygulama Ekran Görüntüsü](/public/1.png)
![Uygulama Ekran Görüntüsü](/public/2.png)
![Uygulama Ekran Görüntüsü](/public/3.png)
![Uygulama Ekran Görüntüsü](/public/4.png)
![Uygulama Ekran Görüntüsü](/public/5.png)

## Bilgisayarınızda Çalıştırın

Projeyi klonlayın

```bash
  git clone https://github.com/Recepurkun/Code16_BitirmeProjesi.git
```

Proje dizinine gidin

```bash
  cd code16bitirmeprojesi
```

Gerekli paketleri yükleyin

```bash
  npm install
```

Sunucuyu çalıştırın

```bash
  npm run dev
```
  
## License

[MIT](https://choosealicense.com/licenses/mit/)
  

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
