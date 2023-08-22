[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=11558473)
# elasticsearch

## 0. Persiapan
Pastikan pengaturan kernel vm.max_map_count diatur setidaknya menjadi 262144 untuk penggunaan produksi

Untuk melihat nilai saat ini dari pengaturan vm.max_map_count, jalankan perintah berikut:

```bash
grep vm.max_map_count /etc/sysctl.conf
```


Untuk menerapkan pengaturan tersebut pada sistem yang sedang berjalan, gunakan perintah:

```bash
sysctl -w vm.max_map_count=262144
```


Jika  ingin mengubah nilai vm.max_map_count secara permanen, ikuti langkah-langkah berikut:
Buka file konfigurasi sysctl.conf menggunakan editor teks seperti nano atau vi dengan hak akses root atau menggunakan sudo:

```bash
sudo nano /etc/sysctl.conf
```


Di dalam file sysctl.conf, tambahkan baris berikut:

```bash
vm.max_map_count=524288
```


Simpan perubahan dan keluar dari editor teks. Atau, dapat menggunakan perintah berikut:

```bash
echo "vm.max_map_count=524288" | sudo tee -a /etc/sysctl.conf
```


Terapkan perubahan yang baru saja dibuat dengan menjalankan:	

```bash
sudo sysctl –p
```


Untuk memeriksa pengaturan yang telah diubah, gunakan perintah:

```bash
sysctl vm.max_map_count
```




## 1. Install Elasticsearch
Langkah pertama adalah menginstal Elasticsearch. Lakukan langkah-langkah berikut:
Buka terminal dan navigasi ke folder .devcontainer.

```bash
docker-compose up –d
```


## 2. Install Logstash
Langkah selanjutnya adalah menginstal Logstash dan mengonfigurasi beberapa hal. Ikuti langkah-langkah di bawah ini:
Unduh dan pasang Kunci Tanda Tangan Publik:

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elastic-keyring.gpg
```


Jika menggunakan Debian, mungkin perlu menginstal paket apt-transport-https sebelum melanjutkan:

```bash
sudo apt-get install apt-transport-https
```


Simpan definisi repositori ke /etc/apt/sources.list.d/elastic-8.x.list:

```bash
echo "deb [signed-by=/usr/share/keyrings/elastic-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-8.x.list
```


Jalankan perintah berikut untuk memperbarui informasi repositori:

```bash
sudo apt-get update
```


Instal Logstash dengan perintah:

```bash
sudo apt-get install logstash
```


Instal Plugin dengan perintah:

```bash
sudo /usr/share/logstash/bin/logstash-plugin install logstash-input-mongodb
```


Salin file konfigurasi:

```bash
sudo cp logstash-people.conf /etc/logstash/conf.d/logstash.conf
```


Buat folder untuk Logstash:

```bash
mkdir logstash/logstash-people
```


Buat Index baru (misalnya, "people") dengan perintah:

```bash
curl --location --request PUT 'http://localhost:9200/people' --header 'Content-Type: application/json' --data '{
    "settings": { "number_of_shards": 5, "number_of_replicas": 1 }
}'
```


Jalankan Logstash dengan perintah:

```bash
sudo /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/logstash.conf
```



