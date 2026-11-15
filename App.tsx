import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Volume2, VolumeX, Repeat2, Play, Square, Sparkles, Megaphone, X } from "lucide-react";
import "./index.css";

type Item = {
  id: string;
  name: string;
  emoji?: string;
  display?: string;
  subtitle?: string;
  arabic?: string;
  speech: string;
  extra?: string;
  bg?: string;
  textColor?: string;
  num?: number;
};

type Category = {
  id: string;
  label: string;
  emoji: string;
  tabBg: string;
  tabInk: string;
  intro: string;
  items: Item[];
};

const CATEGORIES: Category[] = [
  {
    id: "warna", label: "Warna", emoji: "🎨", tabBg: "#FFD166", tabInk: "#4A2500", intro: "Yuk, kenali warna-warni!",
    items: [
      { id: "warna-merah", name: "Merah", emoji: "🔴", speech: "warna merah", bg: "#FF4D4D", textColor: "#FFFFFF" },
      { id: "warna-kuning", name: "Kuning", emoji: "🟡", speech: "warna kuning", bg: "#FFD93D", textColor: "#4A2500" },
      { id: "warna-hijau", name: "Hijau", emoji: "🟢", speech: "warna hijau", bg: "#2E9E5B", textColor: "#FFFFFF" },
      { id: "warna-biru", name: "Biru", emoji: "🔵", speech: "warna biru", bg: "#2B7FFF", textColor: "#FFFFFF" },
      { id: "warna-ungu", name: "Ungu", emoji: "🟣", speech: "warna ungu", bg: "#7C4DFF", textColor: "#FFFFFF" },
      { id: "warna-pink", name: "Pink", emoji: "🩷", speech: "warna pink", bg: "#FF7AA8", textColor: "#FFFFFF" },
      { id: "warna-oranye", name: "Oranye", emoji: "🟠", speech: "warna oranye", bg: "#FF7A1A", textColor: "#FFFFFF" },
      { id: "warna-coklat", name: "Coklat", emoji: "🟤", speech: "warna coklat", bg: "#8D5A2B", textColor: "#FFFFFF" },
      { id: "warna-hitam", name: "Hitam", emoji: "⚫", speech: "warna hitam", bg: "#2B2B2B", textColor: "#FFFFFF" },
      { id: "warna-putih", name: "Putih", emoji: "⚪", speech: "warna putih", bg: "#FFFFFF", textColor: "#2B2118" },
    ],
  },
  {
    id: "binatang", label: "Binatang", emoji: "🐰", tabBg: "#B8E986", tabInk: "#1E4A1A", intro: "Hewan-hewan lucu di sekitar kita.",
    items: [
      { id: "binatang-kucing", name: "Kucing", emoji: "🐱", speech: "kucing" },
      { id: "binatang-anjing", name: "Anjing", emoji: "🐶", speech: "anjing" },
      { id: "binatang-kelinci", name: "Kelinci", emoji: "🐰", speech: "kelinci" },
      { id: "binatang-ayam", name: "Ayam", emoji: "🐔", speech: "ayam" },
      { id: "binatang-sapi", name: "Sapi", emoji: "🐄", speech: "sapi" },
      { id: "binatang-kambing", name: "Kambing", emoji: "🐐", speech: "kambing" },
      { id: "binatang-gajah", name: "Gajah", emoji: "🐘", speech: "gajah" },
      { id: "binatang-harimau", name: "Harimau", emoji: "🐯", speech: "harimau" },
      { id: "binatang-monyet", name: "Monyet", emoji: "🐵", speech: "monyet" },
      { id: "binatang-bebek", name: "Bebek", emoji: "🦆", speech: "bebek" },
      { id: "binatang-kuda", name: "Kuda", emoji: "🐴", speech: "kuda" },
      { id: "binatang-singa", name: "Singa", emoji: "🦁", speech: "singa" },
      { id: "binatang-beruang", name: "Beruang", emoji: "🐻", speech: "beruang" },
      { id: "binatang-zebra", name: "Zebra", emoji: "🦓", speech: "zebra" },
      { id: "binatang-jerapah", name: "Jerapah", emoji: "🦒", speech: "jerapah" },
      { id: "binatang-panda", name: "Panda", emoji: "🐼", speech: "panda" },
      { id: "binatang-koala", name: "Koala", emoji: "🐨", speech: "koala" },
      { id: "binatang-serigala", name: "Serigala", emoji: "🐺", speech: "serigala" },
      { id: "binatang-rubah", name: "Rubah", emoji: "🦊", speech: "rubah" },
      { id: "binatang-landak", name: "Landak", emoji: "🦔", speech: "landak" },
      { id: "binatang-tupai", name: "Tupai", emoji: "🐿️", speech: "tupai" },
      { id: "binatang-tikus", name: "Tikus", emoji: "🐭", speech: "tikus" },
      { id: "binatang-kura-darat", name: "Kura-kura Darat", emoji: "🐢", speech: "kura-kura darat" },
      { id: "binatang-ular", name: "Ular", emoji: "🐍", speech: "ular" },
      { id: "binatang-katak", name: "Katak", emoji: "🐸", speech: "katak" },
      { id: "binatang-kadal", name: "Kadal", emoji: "🦎", speech: "kadal" },
      { id: "binatang-kupu", name: "Kupu-kupu", emoji: "🦋", speech: "kupu-kupu" },
      { id: "binatang-lebah", name: "Lebah", emoji: "🐝", speech: "lebah" },
      { id: "binatang-semut", name: "Semut", emoji: "🐜", speech: "semut" },
      { id: "binatang-laba", name: "Laba-laba", emoji: "🕷️", speech: "laba-laba" },
      { id: "binatang-kelelawar", name: "Kelelawar", emoji: "🦇", speech: "kelelawar" },
      { id: "binatang-unta", name: "Unta", emoji: "🐫", speech: "unta" },
      { id: "binatang-domba", name: "Domba", emoji: "🐑", speech: "domba" },
      { id: "binatang-babi", name: "Babi", emoji: "🐷", speech: "babi" },
      { id: "binatang-rusa", name: "Rusa", emoji: "🦌", speech: "rusa" },
      { id: "binatang-hantu", name: "Burung Hantu", emoji: "🦉", speech: "burung hantu" },
      { id: "binatang-elang", name: "Elang", emoji: "🦅", speech: "elang" },
      { id: "binatang-merpati", name: "Merpati", emoji: "🕊️", speech: "merpati" },
      { id: "binatang-cacing", name: "Cacing", emoji: "🪱", speech: "cacing" },
      { id: "binatang-siput", name: "Siput", emoji: "🐌", speech: "siput" },
    ],
  },
  {
    id: "buah", label: "Buah", emoji: "🍎", tabBg: "#FFB3C1", tabInk: "#5A1226", intro: "Buah segar, manis dan sehat.",
    items: [
      { id: "buah-apel", name: "Apel", emoji: "🍎", speech: "apel" },
      { id: "buah-pisang", name: "Pisang", emoji: "🍌", speech: "pisang" },
      { id: "buah-jeruk", name: "Jeruk", emoji: "🍊", speech: "jeruk" },
      { id: "buah-anggur", name: "Anggur", emoji: "🍇", speech: "anggur" },
      { id: "buah-mangga", name: "Mangga", emoji: "🥭", speech: "mangga" },
      { id: "buah-stroberi", name: "Stroberi", emoji: "🍓", speech: "stroberi" },
      { id: "buah-semangka", name: "Semangka", emoji: "🍉", speech: "semangka" },
      { id: "buah-pepaya", name: "Pepaya", emoji: "🍑", speech: "pepaya" },
      { id: "buah-nanas", name: "Nanas", emoji: "🍍", speech: "nanas" },
      { id: "buah-jambu", name: "Jambu", emoji: "🍐", speech: "jambu" },
      { id: "buah-melon", name: "Melon", emoji: "🍈", speech: "melon" },
      { id: "buah-alpukat", name: "Alpukat", emoji: "🥑", speech: "alpukat" },
      { id: "buah-kelapa", name: "Kelapa", emoji: "🥥", speech: "kelapa" },
      { id: "buah-rambutan", name: "Rambutan", emoji: "🍒", speech: "rambutan" },
      { id: "buah-duku", name: "Duku", emoji: "🫐", speech: "duku" },
      { id: "buah-manggis", name: "Manggis", emoji: "🍇", speech: "manggis" },
      { id: "buah-durian", name: "Durian", emoji: "🍈", speech: "durian" },
      { id: "buah-salak", name: "Salak", emoji: "🍎", speech: "salak" },
      { id: "buah-belimbing", name: "Belimbing", emoji: "⭐", speech: "belimbing" },
      { id: "buah-sirsak", name: "Sirsak", emoji: "🍐", speech: "sirsak" },
      { id: "buah-nangka", name: "Nangka", emoji: "🍍", speech: "nangka" },
      { id: "buah-ceri", name: "Ceri", emoji: "🍒", speech: "ceri" },
      { id: "buah-kiwi", name: "Kiwi", emoji: "🥝", speech: "kiwi" },
      { id: "buah-persik", name: "Persik", emoji: "🍑", speech: "persik" },
      { id: "buah-plum", name: "Plum", emoji: "🫐", speech: "plum" },
      { id: "buah-kurma", name: "Kurma", emoji: "🫒", speech: "kurma" },
      { id: "buah-naga", name: "Buah Naga", emoji: "🐉", speech: "buah naga" },
      { id: "buah-lemon", name: "Lemon", emoji: "🍋", speech: "lemon" },
      { id: "buah-jerukbali", name: "Jeruk Bali", emoji: "🍊", speech: "jeruk bali" },
      { id: "buah-markisa", name: "Markisa", emoji: "🍋", speech: "markisa" },
    ],
  },
  {
    id: "sayur", label: "Sayur", emoji: "🥕", tabBg: "#A8E6A1", tabInk: "#123F1A", intro: "Sayur membuat badan kuat.",
    items: [
      { id: "sayur-wortel", name: "Wortel", emoji: "🥕", speech: "wortel" },
      { id: "sayur-bayam", name: "Bayam", emoji: "🥬", speech: "bayam" },
      { id: "sayur-brokoli", name: "Brokoli", emoji: "🥦", speech: "brokoli" },
      { id: "sayur-kentang", name: "Kentang", emoji: "🥔", speech: "kentang" },
      { id: "sayur-tomat", name: "Tomat", emoji: "🍅", speech: "tomat" },
      { id: "sayur-jagung", name: "Jagung", emoji: "🌽", speech: "jagung" },
      { id: "sayur-timun", name: "Timun", emoji: "🥒", speech: "timun" },
      { id: "sayur-kol", name: "Kol", emoji: "🥗", speech: "kol" },
      { id: "sayur-terong", name: "Terong", emoji: "🍆", speech: "terong" },
      { id: "sayur-bawang", name: "Bawang", emoji: "🧅", speech: "bawang" },
      { id: "sayur-kangkung", name: "Kangkung", emoji: "🥬", speech: "kangkung" },
      { id: "sayur-sawi", name: "Sawi", emoji: "🥬", speech: "sawi" },
      { id: "sayur-selada", name: "Selada", emoji: "🥗", speech: "selada" },
      { id: "sayur-buncis", name: "Buncis", emoji: "🫛", speech: "buncis" },
      { id: "sayur-kacangpanjang", name: "Kacang Panjang", emoji: "🫛", speech: "kacang panjang" },
      { id: "sayur-labu", name: "Labu", emoji: "🎃", speech: "labu" },
      { id: "sayur-oyong", name: "Oyong", emoji: "🥒", speech: "oyong" },
      { id: "sayur-pare", name: "Pare", emoji: "🥒", speech: "pare" },
      { id: "sayur-daunsingkong", name: "Daun Singkong", emoji: "🍃", speech: "daun singkong" },
      { id: "sayur-tauge", name: "Tauge", emoji: "🌱", speech: "tauge" },
      { id: "sayur-jamur", name: "Jamur", emoji: "🍄", speech: "jamur" },
      { id: "sayur-seledri", name: "Seledri", emoji: "🌿", speech: "seledri" },
      { id: "sayur-daunbawang", name: "Daun Bawang", emoji: "🧅", speech: "daun bawang" },
      { id: "sayur-paprika", name: "Paprika", emoji: "🫑", speech: "paprika" },
      { id: "sayur-lobak", name: "Lobak", emoji: "🥕", speech: "lobak" },
      { id: "sayur-bit", name: "Bit", emoji: "🫜", speech: "bit" },
      { id: "sayur-asparagus", name: "Asparagus", emoji: "🌱", speech: "asparagus" },
      { id: "sayur-rebung", name: "Rebung", emoji: "🎋", speech: "rebung" },
      { id: "sayur-jengkol", name: "Jengkol", emoji: "🫘", speech: "jengkol" },
      { id: "sayur-petai", name: "Petai", emoji: "🫛", speech: "petai" },
    ],
  },
  {
    id: "kendaraan", label: "Kendaraan", emoji: "🚗", tabBg: "#AED6FF", tabInk: "#123A6B", intro: "Brumm... ayo jalan-jalan!",
    items: [
      { id: "kendaraan-mobil", name: "Mobil", emoji: "🚗", speech: "mobil" },
      { id: "kendaraan-motor", name: "Motor", emoji: "🏍️", speech: "motor" },
      { id: "kendaraan-bus", name: "Bus", emoji: "🚌", speech: "bus" },
      { id: "kendaraan-kereta", name: "Kereta", emoji: "🚂", speech: "kereta" },
      { id: "kendaraan-pesawat", name: "Pesawat", emoji: "✈️", speech: "pesawat" },
      { id: "kendaraan-kapal", name: "Kapal", emoji: "🚢", speech: "kapal" },
      { id: "kendaraan-truk", name: "Truk", emoji: "🚚", speech: "truk" },
      { id: "kendaraan-sepeda", name: "Sepeda", emoji: "🚲", speech: "sepeda" },
      { id: "kendaraan-ambulans", name: "Ambulans", emoji: "🚑", speech: "ambulans" },
      { id: "kendaraan-pemadam", name: "Pemadam", emoji: "🚒", speech: "pemadam" },
      { id: "kendaraan-keretaapi", name: "Kereta Api", emoji: "🚆", speech: "kereta api" },
      { id: "kendaraan-helikopter", name: "Helikopter", emoji: "🚁", speech: "helikopter" },
      { id: "kendaraan-perahu", name: "Perahu", emoji: "🛶", speech: "perahu" },
      { id: "kendaraan-kapalpesiar", name: "Kapal Pesiar", emoji: "🛳️", speech: "kapal pesiar" },
      { id: "kendaraan-sepedamotor", name: "Sepeda Motor", emoji: "🏍️", speech: "sepeda motor" },
      { id: "kendaraan-becak", name: "Becak", emoji: "🛺", speech: "becak" },
      { id: "kendaraan-delman", name: "Delman", emoji: "🐎", speech: "delman" },
      { id: "kendaraan-traktor", name: "Traktor", emoji: "🚜", speech: "traktor" },
      { id: "kendaraan-mobilpolisi", name: "Mobil Polisi", emoji: "🚓", speech: "mobil polisi" },
      { id: "kendaraan-mobilbalap", name: "Mobil Balap", emoji: "🏎️", speech: "mobil balap" },
      { id: "kendaraan-forklift", name: "Forklift", emoji: "🏗️", speech: "forklift" },
      { id: "kendaraan-buldoser", name: "Buldoser", emoji: "🚜", speech: "buldoser" },
      { id: "kendaraan-derek", name: "Derek", emoji: "🚛", speech: "derek" },
      { id: "kendaraan-tank", name: "Tank", emoji: "🪖", speech: "tank" },
      { id: "kendaraan-jetski", name: "Jetski", emoji: "🛥️", speech: "jetski" },
      { id: "kendaraan-skuter", name: "Skuter", emoji: "🛴", speech: "skuter" },
      { id: "kendaraan-keretakuda", name: "Kereta Kuda", emoji: "🐎", speech: "kereta kuda" },
      { id: "kendaraan-trem", name: "Trem", emoji: "🚋", speech: "trem" },
      { id: "kendaraan-subway", name: "Subway", emoji: "🚇", speech: "subway" },
      { id: "kendaraan-roket", name: "Roket", emoji: "🚀", speech: "roket" },
      { id: "kendaraan-balon", name: "Balon Udara", emoji: "🎈", speech: "balon udara" },
      { id: "kendaraan-kapalselam", name: "Kapal Selam", emoji: "🛳️", speech: "kapal selam" },
      { id: "kendaraan-mobilpemadam", name: "Mobil Pemadam", emoji: "🚒", speech: "mobil pemadam" },
      { id: "kendaraan-taksi", name: "Taksi", emoji: "🚕", speech: "taksi" },
      { id: "kendaraan-angkot", name: "Angkot", emoji: "🚐", speech: "angkot" },
      { id: "kendaraan-bajaj", name: "Bajaj", emoji: "🛺", speech: "bajaj" },
      { id: "kendaraan-odong", name: "Odong-odong", emoji: "🎠", speech: "odong-odong" },
      { id: "kendaraan-gerobak", name: "Gerobak", emoji: "🛒", speech: "gerobak" },
      { id: "kendaraan-rodatiga", name: "Sepeda Roda Tiga", emoji: "🚲", speech: "sepeda roda tiga" },
      { id: "kendaraan-eskrim", name: "Mobil Es Krim", emoji: "🍦", speech: "mobil es krim" },
    ],
  },
  {
    id: "laut", label: "Hewan Laut", emoji: "🐬", tabBg: "#A0E7E5", tabInk: "#0B3D4A", intro: "Teman-teman yang tinggal di laut.",
    items: [
      { id: "laut-ikan", name: "Ikan", emoji: "🐟", speech: "ikan" },
      { id: "laut-paus", name: "Paus", emoji: "🐋", speech: "paus" },
      { id: "laut-gurita", name: "Gurita", emoji: "🐙", speech: "gurita" },
      { id: "laut-kura", name: "Kura-kura", emoji: "🐢", speech: "kura-kura" },
      { id: "laut-kepiting", name: "Kepiting", emoji: "🦀", speech: "kepiting" },
      { id: "laut-udang", name: "Udang", emoji: "🦐", speech: "udang" },
      { id: "laut-hiu", name: "Hiu", emoji: "🦈", speech: "hiu" },
      { id: "laut-lumba", name: "Lumba-lumba", emoji: "🐬", speech: "lumba-lumba" },
      { id: "laut-bintang", name: "Bintang Laut", emoji: "⭐", speech: "bintang laut" },
      { id: "laut-kuda", name: "Kuda Laut", emoji: "🐴", speech: "kuda laut" },
      { id: "laut-badut", name: "Ikan Badut", emoji: "🐠", speech: "ikan badut" },
      { id: "laut-pausbiru", name: "Ikan Paus Biru", emoji: "🐋", speech: "ikan paus biru" },
      { id: "laut-penyu", name: "Penyu", emoji: "🐢", speech: "penyu" },
      { id: "laut-anemon", name: "Anemon", emoji: "🌸", speech: "anemon" },
      { id: "laut-teripang", name: "Teripang", emoji: "🥒", speech: "teripang" },
      { id: "laut-kerang", name: "Kerang", emoji: "🐚", speech: "kerang" },
      { id: "laut-tiram", name: "Tiram", emoji: "🦪", speech: "tiram" },
      { id: "laut-pari", name: "Ikan Pari", emoji: "🐟", speech: "ikan pari" },
      { id: "laut-hiumartil", name: "Ikan Hiu Martil", emoji: "🦈", speech: "ikan hiu martil" },
      { id: "laut-ubur", name: "Ubur-ubur", emoji: "🪼", speech: "ubur-ubur" },
      { id: "laut-lobster", name: "Lobster", emoji: "🦞", speech: "lobster" },
      { id: "laut-lele", name: "Ikan Lele Laut", emoji: "🐟", speech: "ikan lele laut" },
      { id: "laut-tuna", name: "Ikan Tuna", emoji: "🐟", speech: "ikan tuna" },
      { id: "laut-salmon", name: "Ikan Salmon", emoji: "🍣", speech: "ikan salmon" },
      { id: "laut-koi", name: "Ikan Koi", emoji: "🐟", speech: "ikan koi" },
      { id: "laut-cupang", name: "Ikan Cupang", emoji: "🐠", speech: "ikan cupang" },
      { id: "laut-arwana", name: "Ikan Arwana", emoji: "🐠", speech: "ikan arwana" },
      { id: "laut-mas", name: "Ikan Mas", emoji: "🐟", speech: "ikan mas" },
      { id: "laut-belut", name: "Belut Laut", emoji: "🪱", speech: "belut laut" },
      { id: "laut-cumi", name: "Cumi-cumi", emoji: "🦑", speech: "cumi-cumi" },
    ],
  },
  {
    id: "abjad", label: "Abjad", emoji: "🔤", tabBg: "#FFD166", tabInk: "#4A2500", intro: "A sampai Z, seru sekali!",
    items: [
      { id: "abjad-a", name: "A", display: "A", subtitle: "Apel", emoji: "🍎", speech: "huruf A" },
      { id: "abjad-b", name: "B", display: "B", subtitle: "Bola", emoji: "⚽", speech: "huruf B" },
      { id: "abjad-c", name: "C", display: "C", subtitle: "Ceri", emoji: "🍒", speech: "huruf C" },
      { id: "abjad-d", name: "D", display: "D", subtitle: "Domba", emoji: "🐑", speech: "huruf D" },
      { id: "abjad-e", name: "E", display: "E", subtitle: "Elang", emoji: "🦅", speech: "huruf E" },
      { id: "abjad-f", name: "F", display: "F", subtitle: "Flamingo", emoji: "🦩", speech: "huruf F" },
      { id: "abjad-g", name: "G", display: "G", subtitle: "Gajah", emoji: "🐘", speech: "huruf G" },
      { id: "abjad-h", name: "H", display: "H", subtitle: "Harimau", emoji: "🐯", speech: "huruf H" },
      { id: "abjad-i", name: "I", display: "I", subtitle: "Ikan", emoji: "🐟", speech: "huruf I" },
      { id: "abjad-j", name: "J", display: "J", subtitle: "Jeruk", emoji: "🍊", speech: "huruf J" },
      { id: "abjad-k", name: "K", display: "K", subtitle: "Kucing", emoji: "🐱", speech: "huruf K" },
      { id: "abjad-l", name: "L", display: "L", subtitle: "Lumba-lumba", emoji: "🐬", speech: "huruf L" },
      { id: "abjad-m", name: "M", display: "M", subtitle: "Monyet", emoji: "🐵", speech: "huruf M" },
      { id: "abjad-n", name: "N", display: "N", subtitle: "Nanas", emoji: "🍍", speech: "huruf N" },
      { id: "abjad-o", name: "O", display: "O", subtitle: "Obor", emoji: "🔦", speech: "huruf O" },
      { id: "abjad-p", name: "P", display: "P", subtitle: "Pisang", emoji: "🍌", speech: "huruf P" },
      { id: "abjad-q", name: "Q", display: "Q", subtitle: "Qur'an", emoji: "📖", speech: "huruf Q" },
      { id: "abjad-r", name: "R", display: "R", subtitle: "Rusa", emoji: "🦌", speech: "huruf R" },
      { id: "abjad-s", name: "S", display: "S", subtitle: "Sapi", emoji: "🐄", speech: "huruf S" },
      { id: "abjad-t", name: "T", display: "T", subtitle: "Tikus", emoji: "🐭", speech: "huruf T" },
      { id: "abjad-u", name: "U", display: "U", subtitle: "Ular", emoji: "🐍", speech: "huruf U" },
      { id: "abjad-v", name: "V", display: "V", subtitle: "Vas Bunga", emoji: "🌷", speech: "huruf V" },
      { id: "abjad-w", name: "W", display: "W", subtitle: "Wortel", emoji: "🥕", speech: "huruf W" },
      { id: "abjad-x", name: "X", display: "X", subtitle: "Xilofon", emoji: "🎶", speech: "huruf X" },
      { id: "abjad-y", name: "Y", display: "Y", subtitle: "Yoyo", emoji: "🪀", speech: "huruf Y" },
      { id: "abjad-z", name: "Z", display: "Z", subtitle: "Zebra", emoji: "🦓", speech: "huruf Z" },
    ],
  },
  {
    id: "angka", label: "Angka", emoji: "🔢", tabBg: "#FF9AA2", tabInk: "#5A1226", intro: "Hitung apelnya, yuk!",
    items: [
      { id: "angka-1", name: "1", display: "1", speech: "angka satu", num: 1 },
      { id: "angka-2", name: "2", display: "2", speech: "angka dua", num: 2 },
      { id: "angka-3", name: "3", display: "3", speech: "angka tiga", num: 3 },
      { id: "angka-4", name: "4", display: "4", speech: "angka empat", num: 4 },
      { id: "angka-5", name: "5", display: "5", speech: "angka lima", num: 5 },
      { id: "angka-6", name: "6", display: "6", speech: "angka enam", num: 6 },
      { id: "angka-7", name: "7", display: "7", speech: "angka tujuh", num: 7 },
      { id: "angka-8", name: "8", display: "8", speech: "angka delapan", num: 8 },
      { id: "angka-9", name: "9", display: "9", speech: "angka sembilan", num: 9 },
      { id: "angka-10", name: "10", display: "10", speech: "angka sepuluh", num: 10 },
      { id: "angka-11", name: "11", display: "11", speech: "angka sebelas", num: 11 },
      { id: "angka-12", name: "12", display: "12", speech: "angka dua belas", num: 12 },
      { id: "angka-13", name: "13", display: "13", speech: "angka tiga belas", num: 13 },
      { id: "angka-14", name: "14", display: "14", speech: "angka empat belas", num: 14 },
      { id: "angka-15", name: "15", display: "15", speech: "angka lima belas", num: 15 },
      { id: "angka-16", name: "16", display: "16", speech: "angka enam belas", num: 16 },
      { id: "angka-17", name: "17", display: "17", speech: "angka tujuh belas", num: 17 },
      { id: "angka-18", name: "18", display: "18", speech: "angka delapan belas", num: 18 },
      { id: "angka-19", name: "19", display: "19", speech: "angka sembilan belas", num: 19 },
      { id: "angka-20", name: "20", display: "20", speech: "angka dua puluh", num: 20 },
    ],
  },
  {
    id: "hijaiyah", label: "Huruf Hijaiyah", emoji: "🌙", tabBg: "#C5B3FF", tabInk: "#2E1A6B", intro: "Huruf Arab, teman mengaji.",
    items: [
      { id: "hijaiyah-alif", name: "Alif", arabic: "ا", speech: "huruf Alif", extra: "Aaa" },
      { id: "hijaiyah-ba", name: "Ba", arabic: "ب", speech: "huruf Ba", extra: "Baa" },
      { id: "hijaiyah-ta", name: "Ta", arabic: "ت", speech: "huruf Ta", extra: "Taa" },
      { id: "hijaiyah-tsa", name: "Tsa", arabic: "ث", speech: "huruf Tsa", extra: "Tsaa" },
      { id: "hijaiyah-jim", name: "Jim", arabic: "ج", speech: "huruf Jim", extra: "Jaa" },
      { id: "hijaiyah-ha", name: "Ha", arabic: "ح", speech: "huruf Ha", extra: "Haa" },
      { id: "hijaiyah-kha", name: "Kha", arabic: "خ", speech: "huruf Kha", extra: "Khaa" },
      { id: "hijaiyah-dal", name: "Dal", arabic: "د", speech: "huruf Dal", extra: "Daa" },
      { id: "hijaiyah-dzal", name: "Dzal", arabic: "ذ", speech: "huruf Dzal", extra: "Dzaa" },
      { id: "hijaiyah-ra", name: "Ra", arabic: "ر", speech: "huruf Ra", extra: "Raa" },
      { id: "hijaiyah-zai", name: "Zai", arabic: "ز", speech: "huruf Zai", extra: "Zaa" },
      { id: "hijaiyah-sin", name: "Sin", arabic: "س", speech: "huruf Sin", extra: "Saa" },
      { id: "hijaiyah-syin", name: "Syin", arabic: "ش", speech: "huruf Syin", extra: "Syaa" },
      { id: "hijaiyah-shod", name: "Shod", arabic: "ص", speech: "huruf Shod", extra: "Shoo" },
      { id: "hijaiyah-dhod", name: "Dhod", arabic: "ض", speech: "huruf Dhod", extra: "Dhoo" },
      { id: "hijaiyah-tho", name: "Tho", arabic: "ط", speech: "huruf Tho", extra: "Thoo" },
      { id: "hijaiyah-zho", name: "Zho", arabic: "ظ", speech: "huruf Zho", extra: "Zhoo" },
      { id: "hijaiyah-ain", name: "Ain", arabic: "ع", speech: "huruf Ain", extra: "A'a" },
      { id: "hijaiyah-ghain", name: "Ghain", arabic: "غ", speech: "huruf Ghain", extra: "Ghoo" },
      { id: "hijaiyah-fa", name: "Fa", arabic: "ف", speech: "huruf Fa", extra: "Faa" },
      { id: "hijaiyah-qof", name: "Qof", arabic: "ق", speech: "huruf Qof", extra: "Qoo" },
      { id: "hijaiyah-kaf", name: "Kaf", arabic: "ك", speech: "huruf Kaf", extra: "Kaa" },
      { id: "hijaiyah-lam", name: "Lam", arabic: "ل", speech: "huruf Lam", extra: "Laa" },
      { id: "hijaiyah-mim", name: "Mim", arabic: "م", speech: "huruf Mim", extra: "Maa" },
      { id: "hijaiyah-nun", name: "Nun", arabic: "ن", speech: "huruf Nun", extra: "Naa" },
      { id: "hijaiyah-waw", name: "Waw", arabic: "و", speech: "huruf Waw", extra: "Waa" },
      { id: "hijaiyah-ha2", name: "Ha", arabic: "ه", speech: "huruf Ha", extra: "Haa" },
      { id: "hijaiyah-lamalif", name: "Lam Alif", arabic: "لا", speech: "huruf Lam Alif", extra: "Laa" },
      { id: "hijaiyah-hamzah", name: "Hamzah", arabic: "ء", speech: "huruf Hamzah", extra: "A'" },
      { id: "hijaiyah-ya", name: "Ya", arabic: "ي", speech: "huruf Ya", extra: "Yaa" },
    ],
  },
];

async function callApi(action: string, args: Record<string, unknown>) {
  const res = await fetch("actions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action, args }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(json.error || "Gagal menghubungi penyimpanan");
  return json.data;
}

export default function App() {
  const [activeCat, setActiveCat] = useState("warna");
  const [search, setSearch] = useState("");
  const [soundOn, setSoundOn] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lastSpoken, setLastSpoken] = useState<string | null>(null);
  const [isSpeakingAll, setIsSpeakingAll] = useState(false);
  const [name, setName] = useState("Tahfidz");
  const [recordId, setRecordId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState("");
  const [saving, setSaving] = useState(false);

  // --- Perbaikan suara ---
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [toast, setToast] = useState("");
  const [unlockBanner, setUnlockBanner] = useState(false);
  const [centerBubble, setCenterBubble] = useState<string | null>(null);
  const [voiceStatus, setVoiceStatus] = useState("Belum ada suara yang dimainkan. Klik tombol di atas dulu ya.");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const stopRef = useRef(false);
  const timerRef = useRef<number | undefined>(undefined);
  const toastTimerRef = useRef<number | undefined>(undefined);
  const centerTimerRef = useRef<number | undefined>(undefined);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const queueRef = useRef<Item[]>([]);
  const queueIndexRef = useRef(0);
  const nameRef = useRef("Tahfidz");
  nameRef.current = name;

  // Muat daftar suara & tangani voices yang belum siap
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const load = () => {
      try {
        const list = window.speechSynthesis.getVoices();
        if (list.length) setVoices(list);
      } catch { /* abaikan */ }
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    // Beberapa browser baru mengisi voices agak lambat
    const t = window.setTimeout(load, 600);
    return () => {
      window.clearTimeout(t);
      if ("speechSynthesis" in window) window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await callApi("records.list", { collection: "pengaturan" });
        const rec = (data?.records || []).find((r: any) => r.value?.jenis === "namaAnak") || data?.records?.[0];
        if (alive && rec?.value?.nama && typeof rec.value.nama === "string" && rec.value.nama.trim()) {
          setName(rec.value.nama);
          setRecordId(rec.id);
        }
      } catch {
        if (alive) setSaveStatus("Nama belum tersimpan — periksa koneksi lalu simpan lagi.");
      }
    })();
    return () => { alive = false; };
  }, []);

  const activeCategory = CATEGORIES.find((c) => c.id === activeCat) || CATEGORIES[0];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return activeCategory.items;
    return activeCategory.items.filter((it) =>
      it.name.toLowerCase().includes(q) ||
      (it.subtitle || "").toLowerCase().includes(q) ||
      (it.speech || "").toLowerCase().includes(q)
    );
  }, [activeCategory, search]);

  function makeSentence(item: Item) {
    const cleanName = nameRef.current.trim() || "Tahfidz";
    const base = `Hai ${cleanName}, ini ${item.speech}.`;
    return item.extra ? `${base} ${item.extra}.` : base;
  }

  function flash(id: string) {
    setActiveId(id);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setActiveId(null), 750);
  }

  function showCenterBubble(text: string) {
    setCenterBubble(text);
    window.clearTimeout(centerTimerRef.current);
    centerTimerRef.current = window.setTimeout(() => setCenterBubble(null), 2000);
  }

  function showToast(text: string) {
    setToast(text);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 3000);
  }

  function showUnlockReminder(sentence: string) {
    setUnlockBanner(true);
    setLastSpoken(sentence);
    showCenterBubble(sentence);
    setVoiceStatus("Suara belum aktif. Klik tombol 🔊 di atas dulu ya.");
  }

  // Fungsi speak yang diperbaiki — selalu dipanggil langsung dari klik user
  function speak(text: string, onDone?: () => void) {
    if (!("speechSynthesis" in window)) {
      setVoiceStatus("Perangkat ini belum mendukung suara. Teks tetap ditampilkan di layar.");
      onDone?.();
      return;
    }
    // Cari voice Bahasa Indonesia dulu
    const all = window.speechSynthesis.getVoices();
    const list = all.length ? all : voices;
    const idVoice = list.find((v) => v.lang.toLowerCase().startsWith("id")) || list.find((v) => v.lang.toLowerCase().includes("id"));
    if (all.length && !voices.length) setVoices(all);

    window.speechSynthesis.cancel();
    // resume() penting: Chrome sering menahan speech sampai ada gestur
    try { window.speechSynthesis.resume(); } catch { /* abaikan */ }

    const u = new SpeechSynthesisUtterance(text);
    u.lang = "id-ID";
    if (idVoice) u.voice = idVoice;
    u.rate = 0.85;
    u.pitch = 1.1;
    u.volume = 1;
    u.onstart = () => setVoiceStatus(`Mengucapkan: “${text}”`);
    u.onend = () => {
      setVoiceStatus(`Selesai: “${text}”`);
      onDone?.();
    };
    u.onerror = () => {
      setVoiceStatus("Suara gagal diputar. Coba klik “🔊 Tes Suara” atau tombol di atas, lalu naikkan volume HP.");
      onDone?.();
    };
    window.speechSynthesis.speak(u);
  }

  // Ucapkan antrean "Ucapkan Semua" lewat onend, bukan setTimeout panjang
  function speakQueueNext() {
    if (stopRef.current) {
      queueRef.current = [];
      setIsSpeakingAll(false);
      setActiveId(null);
      return;
    }
    const queue = queueRef.current;
    const idx = queueIndexRef.current;
    if (idx >= queue.length) {
      queueRef.current = [];
      setIsSpeakingAll(false);
      setActiveId(null);
      setVoiceStatus("Selesai mengucapkan semua kartu.");
      return;
    }
    const item = queue[idx];
    const sentence = makeSentence(item);
    setLastSpoken(sentence);
    setActiveId(item.id);
    speak(sentence, () => {
      if (stopRef.current) {
        queueRef.current = [];
        setIsSpeakingAll(false);
        setActiveId(null);
        return;
      }
      queueIndexRef.current = idx + 1;
      speakQueueNext();
    });
  }

  // Dipanggil LANGSUNG dari klik tombol besar di atas — ini yang membuka izin suara browser
  function unlockAudio() {
    const cleanName = nameRef.current.trim() || "Tahfidz";
    const testText = `Hai ${cleanName}, suaranya sudah aktif. Ayo belajar bareng!`;
    setAudioUnlocked(true);
    setSoundOn(true);
    setUnlockBanner(false);
    setVoiceStatus("Membuka suara…");
    // AudioContext kosong + resume — membantu browser mengizinkan audio
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (AC) {
        if (!audioCtxRef.current) audioCtxRef.current = new AC();
        const ctx = audioCtxRef.current;
        void ctx.resume();
        try {
          const src = ctx.createBufferSource();
          src.connect(ctx.destination);
          src.start();
          src.stop(ctx.currentTime + 0.01);
        } catch { /* abaikan */ }
      }
    } catch { /* abaikan */ }
    if ("speechSynthesis" in window) {
      try { window.speechSynthesis.getVoices(); } catch { /* abaikan */ }
      try { window.speechSynthesis.resume(); } catch { /* abaikan */ }
    }
    showToast("Suara sudah aktif!");
    setLastSpoken(testText);
    // speak() dipanggil di sini, masih di dalam handler klik yang sama
    speak(testText);
  }

  function handleTestSound() {
    // Tes cepat — juga membuka suara kalau belum dibuka
    unlockAudio();
  }

  function handleCard(item: Item) {
    const sentence = makeSentence(item);
    setLastSpoken(sentence);
    flash(item.id);
    if (!audioUnlocked) {
      showUnlockReminder(sentence);
      return;
    }
    if (!soundOn) {
      setVoiceStatus("Suara sedang nonaktif. Klik tombol suara / Tes Suara dulu, ya.");
      showCenterBubble(sentence);
      return;
    }
    // Berhentikan antrean lama supaya kartu ini langsung bersuara
    stopRef.current = true;
    queueRef.current = [];
    setIsSpeakingAll(false);
    speak(sentence);
  }

  function handleRepeat() {
    const text = lastSpoken || `Hai ${nameRef.current.trim() || "Tahfidz"}, ayo belajar bareng!`;
    setLastSpoken(text);
    if (!audioUnlocked) {
      showUnlockReminder(text);
      return;
    }
    if (!soundOn) {
      setVoiceStatus("Suara sedang nonaktif. Nyalakan suara dulu, ya.");
      return;
    }
    speak(text);
  }

  function handleSpeakAll() {
    if (isSpeakingAll) {
      stopRef.current = true;
      queueRef.current = [];
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      setIsSpeakingAll(false);
      setActiveId(null);
      return;
    }
    if (!audioUnlocked) {
      const first = filtered[0] ? makeSentence(filtered[0]) : `Hai ${nameRef.current.trim() || "Tahfidz"}, ayo belajar bareng!`;
      showUnlockReminder(first);
      return;
    }
    if (!soundOn) {
      setVoiceStatus("Suara sedang nonaktif. Nyalakan suara untuk Ucapkan Semua.");
      return;
    }
    if (filtered.length === 0) return;
    stopRef.current = false;
    queueRef.current = [...filtered];
    queueIndexRef.current = 0;
    setIsSpeakingAll(true);
    speakQueueNext();
  }

  async function saveName(value: string) {
    const clean = value.trim() || "Tahfidz";
    if (clean !== value.trim()) setName(clean);
    setSaving(true);
    setSaveStatus("Menyimpan nama...");
    try {
      if (recordId) {
        const data = await callApi("records.replace", { collection: "pengaturan", id: recordId, value: { jenis: "namaAnak", nama: clean } });
        setRecordId(data.id);
      } else {
        const data = await callApi("records.create", { collection: "pengaturan", value: { jenis: "namaAnak", nama: clean }, idempotency_key: `nama-anak-${Date.now()}` });
        setRecordId(data.id);
      }
      setSaveStatus("Nama tersimpan ✓ Suara akan memakai nama baru.");
    } catch {
      setSaveStatus("Belum tersimpan. Coba lagi nanti, ya.");
    } finally {
      setSaving(false);
    }
  }

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    if (!next) {
      stopRef.current = true;
      queueRef.current = [];
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      setIsSpeakingAll(false);
      setActiveId(null);
      setVoiceStatus("Suara dimatikan. Klik lagi untuk mengaktifkan.");
    } else {
      setSaveStatus("Suara aktif. Klik kartu untuk mendengar!");
      if (!audioUnlocked) {
        setUnlockBanner(true);
        setVoiceStatus("Klik tombol 🔊 di atas dulu biar suara keluar.");
      }
    }
  }

  function pickCategory(id: string) {
    stopRef.current = true;
    queueRef.current = [];
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsSpeakingAll(false);
    setActiveCat(id);
    setSearch("");
    setActiveId(null);
    document.getElementById("daftar-kartu")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const soundActive = audioUnlocked && soundOn;

  return (
    <div data-safe-area-inset-root style={{ boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)" }} className="min-h-screen bg-[linear-gradient(180deg,var(--grad-top)_0%,var(--grad-mid)_48%,var(--grad-bottom)_100%)] text-[var(--ink)] overflow-x-clip">
      {/* HEADER — ramping, tinggi 64px, satu baris */}
      <header data-safe-area-sticky-top style={{ top: "var(--safe-area-inset-top)" }} className="sticky z-30 bg-[#FFFDF5]/95 backdrop-blur border-b border-[#EADFC6] shadow-[0_4px_14px_rgba(74,37,0,0.06)]">
        <div className="mx-auto max-w-6xl px-3 sm:px-5 h-16 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-[10px] bg-[#FF7A1A] text-white grid place-items-center text-[18px] shadow-sm shrink-0" aria-hidden>🌟</div>
            <h1 className="font-display font-extrabold leading-none text-[18px] whitespace-nowrap">Belajar Bareng <span className="text-[#FF7A1A]">Tahfidz</span></h1>
            <span role="status" className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white border border-[#EADFC6] px-2 py-0.5 text-[11px] font-display font-bold whitespace-nowrap">
              <span aria-hidden className={`inline-block w-2 h-2 rounded-full ${soundActive ? "bg-[#2E9E5B]" : "bg-[#E5484D]"}`}></span>
              {soundActive ? "Suara: Aktif" : "Suara: Belum Aktif"}
            </span>
          </div>
          <button type="button" onClick={unlockAudio} aria-live="polite" className={`shrink-0 rounded-full px-3 py-1.5 font-display font-bold text-[12px] leading-none shadow-sm active:scale-95 transition whitespace-nowrap ${soundActive ? "bg-[#2E9E5B] text-white" : "bg-[#FF7A1A] text-white animate-pulse"}`}>
            {soundActive ? "✅ Suara Aktif" : "🔊 Klik Biar Ada Suara"}
          </button>
          <div className="flex items-center gap-1.5 bg-white rounded-full border border-[#EADFC6] px-2.5 py-1 shadow-sm shrink-0">
            <label htmlFor="nama-anak" className="font-display font-bold text-[12px] whitespace-nowrap">Nama:</label>
            <input id="nama-anak" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => saveName(name)} onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }} className="w-20 sm:w-28 bg-transparent outline-none font-display font-extrabold text-[14px] text-[#FF7A1A]" maxLength={24} placeholder="Tahfidz" />
            <button onClick={() => saveName(name)} disabled={saving} className="shrink-0 bg-[#FFE9B8] hover:bg-[#FFD166] disabled:opacity-60 text-[#4A2500] font-display font-bold text-[11px] px-2 py-1 rounded-full active:scale-95 transition whitespace-nowrap">{saving ? "Menyimpan…" : "Simpan"}</button>
          </div>
          <button onClick={toggleSound} aria-pressed={soundOn} aria-label={soundOn ? "Matikan suara" : "Nyalakan suara"} className={`shrink-0 rounded-full px-2.5 py-1.5 font-display font-bold text-[12px] flex items-center gap-1 shadow-sm active:scale-95 transition whitespace-nowrap ${soundOn ? "bg-[#2E9E5B] text-white" : "bg-[#E8DDD0] text-[#6B5A4A]"}`}>
            {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span>{soundOn ? "Suara" : "Mati"}</span>
          </button>
          <button onClick={handleTestSound} className="shrink-0 rounded-full px-2.5 py-1.5 font-display font-bold text-[12px] flex items-center gap-1 bg-[#2B7FFF] text-white shadow-sm active:scale-95 transition whitespace-nowrap">🔊 Tes</button>
          <button onClick={handleRepeat} className="shrink-0 flex items-center gap-1 bg-white border border-[#AED6FF] rounded-full px-2.5 py-1.5 font-display font-bold text-[12px] shadow-sm active:scale-95 transition whitespace-nowrap"><Repeat2 size={14} className="text-[#2B7FFF]" /> Ulangi</button>
          <span className="hidden lg:block text-[11px] font-bold text-[var(--ink-soft)] truncate max-w-[180px]" aria-live="polite">{saveStatus || "Nama tersimpan, suara ikut nama baru."}</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-3 sm:px-5 pb-10">
        {/* BANNER PENGINGAT — BERKEDIP KUNING */}
        {unlockBanner && !soundActive && (
          <div role="alert" className="mt-4 animate-pulse rounded-[22px] border-[3px] border-[#FFC400] bg-[#FFF3B0] px-4 py-3 text-center shadow-md">
            <p className="font-display font-extrabold text-[17px] sm:text-[20px] leading-snug">Klik tombol 🔊 di atas dulu ya biar ada suara!</p>
            <p className="text-[13px] font-bold text-[var(--ink-soft)] mt-0.5">Klik pill oranye kecil di header atas — lalu klik kartu lagi.</p>
          </div>
        )}

        {/* SUBTITLE BESAR — APA YANG SEDANG DIUCAPKAN */}
        {lastSpoken && (
          <div aria-live="polite" className="mt-4 flex items-center gap-2 bg-white border-[3px] border-[#FFD166] rounded-[22px] px-4 py-3 shadow-md">
            <span className="text-[28px] shrink-0" aria-hidden>🔊</span>
            <div className="min-w-0">
              <p className="font-display font-extrabold text-[clamp(18px,5vw,26px)] leading-tight break-words">“{lastSpoken}”</p>
              <p className="text-[12px] sm:text-[13px] font-bold text-[var(--ink-soft)] mt-0.5">{voiceStatus}</p>
            </div>
            <button onClick={handleRepeat} className="shrink-0 text-[13px] font-display font-bold bg-[#FFF7E6] border border-[#FFD166] rounded-full px-3 py-1.5 active:scale-95 flex items-center gap-1"><Play size={14} /> Ulangi</button>
          </div>
        )}

        {/* CARI */}
        <div className="mt-4">
          <label className="flex items-center gap-2 bg-white rounded-[22px] border-[3px] border-[#FFD166] shadow-md px-4 py-3">
            <Search className="text-[#FF7A1A] shrink-0" size={24} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari... contoh: kelinci, merah, angka tiga"
              className="flex-1 min-w-0 outline-none bg-transparent font-bold text-[16px] sm:text-[18px] placeholder:text-[#B8A88F]"
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Hapus pencarian" className="p-1 rounded-full bg-[#FFF0D6] active:scale-90"><X size={18} /></button>
            )}
          </label>
        </div>

        {/* TAB KATEGORI */}
        <nav aria-label="Pilih kategori" className="mt-4">
          <p className="font-display font-bold text-[15px] mb-2 flex items-center gap-1.5"><Sparkles size={18} className="text-[#FF7A1A]" /> Pilih kategori dulu, ya!</p>
          <div className="tab-scroll no-scrollbar flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1">
            {CATEGORIES.map((c) => {
              const active = c.id === activeCat;
              return (
                <button
                  key={c.id}
                  onClick={() => pickCategory(c.id)}
                  aria-pressed={active}
                  style={{ background: active ? `linear-gradient(135deg, #FFFFFF 0%, ${c.tabBg}59 100%)` : "#FFFFFF", color: c.tabInk, borderColor: active ? "#E8B98A" : "#EADFC6" }}
                  className={`shrink-0 snap-start rounded-[22px] border-[3px] px-4 py-3 font-display font-extrabold text-[16px] sm:text-[18px] flex items-center gap-2 shadow-sm active:scale-95 transition ${active ? "shadow-lg scale-[1.03]" : ""}`}
                >
                  <span className="text-[24px] leading-none">{c.emoji}</span> {c.label}
                  {active && <span className="text-[13px] bg-white/80 rounded-full px-2 py-0.5">✓</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* KEPALA KATEGORI + UCAPKAN SEMUA */}
        <section id="daftar-kartu" className="mt-5 bg-white rounded-[28px] border-[3px] border-[#F0D9A8] shadow-md p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] grid place-items-center text-[34px] sm:text-[40px] shrink-0" style={{ background: `linear-gradient(135deg, #FFFFFF 0%, ${activeCategory.tabBg}59 100%)` }} aria-hidden>{activeCategory.emoji}</div>
              <div className="min-w-0">
                <h2 className="font-display font-extrabold text-[clamp(24px,6vw,34px)] leading-none">{activeCategory.label}</h2>
                <p className="font-bold text-[var(--ink-soft)] text-[13px] sm:text-[15px] mt-1">{activeCategory.intro} • {filtered.length} kartu</p>
              </div>
            </div>
            <button onClick={handleSpeakAll} className={`w-full sm:w-auto shrink-0 rounded-full px-5 py-3.5 font-display font-extrabold text-[16px] sm:text-[18px] flex items-center justify-center gap-2 shadow-lg active:scale-95 transition ${isSpeakingAll ? "bg-[#2B2B2B] text-white" : "bg-[#FF7A1A] text-white"}`}>
              {isSpeakingAll ? <><Square size={20} fill="currentColor" /> Berhenti</> : <><Megaphone size={22} /> Ucapkan Semua</>}
            </button>
          </div>

          {/* GRID KARTU */}
          {filtered.length === 0 ? (
            <div className="mt-6 text-center py-10">
              <div className="text-[52px]">🔍</div>
              <p className="font-display font-extrabold text-[20px] mt-2">Tidak ketemu, nih.</p>
              <p className="font-bold text-[var(--ink-soft)]">Coba kata lain, ya!</p>
              <button onClick={() => setSearch("")} className="mt-4 bg-[#FFD166] font-display font-bold px-5 py-2.5 rounded-full active:scale-95">Lihat Semua Kartu</button>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map((item) => {
                const isActive = activeId === item.id;
                const isWarna = activeCategory.id === "warna";
                const isAbjad = activeCategory.id === "abjad";
                const isAngka = activeCategory.id === "angka";
                const isHijaiyah = activeCategory.id === "hijaiyah";
                return (
                  <button
                    key={item.id}
                    onClick={() => handleCard(item)}
                    aria-label={`Dengar ${item.speech}`}
                    style={undefined}
                    className={`relative min-h-[150px] sm:min-h-[180px] rounded-[26px] border-[3px] p-3 sm:p-4 flex flex-col items-center justify-center gap-1 text-center shadow-[0_8px_18px_rgba(74,37,0,0.08)] active:scale-95 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF7A1A] ${isActive ? "card-active" : ""} bg-white border-[#EADFC6] hover:border-[#E8B98A] shadow-[0_6px_16px_rgba(74,37,0,0.06)]`}
                  >
                    <span className="absolute top-2 right-2 text-[14px] opacity-70" aria-hidden>🔊</span>
                    {isHijaiyah ? (
                      <>
                        <span className="font-display font-extrabold leading-none text-[clamp(54px,14vw,72px)]" dir="rtl" lang="ar">{item.arabic}</span>
                        <span className="font-display font-extrabold text-[22px] sm:text-[26px] leading-tight mt-1">{item.name}</span>
                        <span className="text-[12px] sm:text-[13px] font-bold text-[var(--ink-soft)]">Bunyinya: {item.extra}</span>
                      </>
                    ) : isAbjad ? (
                      <>
                        <span className="font-display font-extrabold leading-none text-[clamp(54px,14vw,72px)] text-[#FF7A1A]">{item.display}</span>
                        <span className="text-[34px] sm:text-[40px] leading-none" aria-hidden>{item.emoji}</span>
                        <span className="font-display font-extrabold text-[19px] sm:text-[22px] leading-tight">{item.display} — {item.subtitle}</span>
                      </>
                    ) : isAngka ? (
                      <>
                        <span className="font-display font-extrabold leading-none text-[clamp(54px,14vw,72px)] text-[#2B7FFF]">{item.display}</span>
                        <span className="flex flex-wrap justify-center gap-[2px] leading-none text-[18px] sm:text-[22px] max-w-full" aria-hidden>
                          {Array.from({ length: item.num || 1 }).map((_, i) => <span key={i}>🍎</span>)}
                        </span>
                        <span className="font-bold text-[13px] text-[var(--ink-soft)]">Hitung apelnya!</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[clamp(52px,14vw,68px)] leading-none" aria-hidden>{item.emoji}</span>
                        <span className="font-display font-extrabold text-[22px] sm:text-[26px] leading-[1.05] break-words">{item.name}</span>
                        <span className="text-[12px] sm:text-[13px] font-bold opacity-80">Ketuk untuk dengar</span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white rounded-3xl border-2 border-[#F0D9A8] p-4 text-center">
            <div className="text-[28px]">👆</div>
            <p className="font-display font-extrabold mt-1">1. Pilih Kategori</p>
            <p className="text-[13px] font-bold text-[var(--ink-soft)]">Warna, hewan, buah, sampai Hijaiyah.</p>
          </div>
          <div className="bg-white rounded-3xl border-2 border-[#F0D9A8] p-4 text-center">
            <div className="text-[28px]">🃏</div>
            <p className="font-display font-extrabold mt-1">2. Ketuk Kartu Besar</p>
            <p className="text-[13px] font-bold text-[var(--ink-soft)]">Kartu bergoyang &amp; bersuara.</p>
          </div>
          <div className="bg-white rounded-3xl border-2 border-[#F0D9A8] p-4 text-center">
            <div className="text-[28px]">🔊</div>
            <p className="font-display font-extrabold mt-1">3. Dengarkan &amp; Tirukan</p>
            <p className="text-[13px] font-bold text-[var(--ink-soft)]">“Hai {name.trim() || "Tahfidz"}, ini ...”</p>
          </div>
        </div>

        <footer className="mt-6 text-center">
          <p className="font-display font-bold text-[15px]">Dibuat dengan sayang untuk {name.trim() || "Tahfidz"} 💛</p>
          <p className="text-[12px] font-bold text-[var(--ink-soft)] mt-1">Tanpa iklan • Tanpa skor • Tanpa timer • Tanpa login</p>
          <p className="text-[11px] text-[var(--ink-soft)] mt-2">Suara memakai suara perangkat. Pastikan suara perangkat menyala.</p>
        </footer>
      </main>

      {/* BUBBLE BESAR DI TENGAH — saat suara belum aktif */}
      {centerBubble && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none" aria-live="polite">
          <div className="max-w-[92vw] bg-white border-4 border-[#FF7A1A] rounded-[28px] shadow-2xl px-5 py-5 text-center">
            <div className="text-[42px]" aria-hidden>🔊</div>
            <p className="font-display font-extrabold text-[clamp(22px,6vw,32px)] leading-tight break-words">“{centerBubble}”</p>
            <p className="text-[13px] font-bold text-[var(--ink-soft)] mt-2">Baca dulu ya — klik tombol 🔊 di atas biar ada suaranya.</p>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div role="status" className="fixed left-1/2 -translate-x-1/2 bottom-5 z-50 bg-[#2E9E5B] text-white font-display font-extrabold text-[16px] sm:text-[18px] px-5 py-3 rounded-full shadow-2xl whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}
