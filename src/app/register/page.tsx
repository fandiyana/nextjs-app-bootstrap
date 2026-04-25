"use client";

import { useState, FormEvent } from "react";
import styles from "./register.module.css";

interface FormData {
  namaLengkap: string;
  email: string;
  nomorHP: string;
  password: string;
  konfirmasiPassword: string;
  kodeReferral: string;
  setujuSyarat: boolean;
}

interface FormErrors {
  namaLengkap?: string;
  email?: string;
  nomorHP?: string;
  password?: string;
  konfirmasiPassword?: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    namaLengkap: "",
    email: "",
    nomorHP: "",
    password: "",
    konfirmasiPassword: "",
    kodeReferral: "00071516",
    setujuSyarat: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.namaLengkap.trim()) {
      newErrors.namaLengkap = "Nama lengkap wajib diisi";
    } else if (formData.namaLengkap.trim().length < 3) {
      newErrors.namaLengkap = "Nama lengkap minimal 3 karakter";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.nomorHP.trim()) {
      newErrors.nomorHP = "Nomor HP wajib diisi";
    } else if (!/^(\+62|62|0)8[1-9][0-9]{7,10}$/.test(formData.nomorHP)) {
      newErrors.nomorHP = "Format nomor HP tidak valid (contoh: 08xxxxxxxxxx)";
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)
    ) {
      newErrors.password =
        "Password harus mengandung huruf besar, huruf kecil, dan angka";
    }

    if (!formData.konfirmasiPassword) {
      newErrors.konfirmasiPassword = "Konfirmasi password wajib diisi";
    } else if (formData.password !== formData.konfirmasiPassword) {
      newErrors.konfirmasiPassword = "Password tidak sama";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.setujuSyarat) {
      alert("Anda harus menyetujui Syarat & Ketentuan untuk melanjutkan");
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className={styles.successTitle}>Registrasi Berhasil!</h2>
            <p className={styles.successText}>
              Selamat <strong>{formData.namaLengkap}</strong>, akun Anda telah
              berhasil dibuat! Lanjutkan lewat bot untuk reservasi perawatan
              gigi.
            </p>
            <div className={styles.successPoints}>
              <div className={styles.pointsBadge}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <span>Poin gratis telah ditambahkan ke akun Anda!</span>
              </div>
            </div>

            <div className={styles.botSection}>
              <h3 className={styles.botTitle}>Lanjutkan lewat Bot</h3>
              <p className={styles.botDescription}>
                Pilih bot untuk reservasi perawatan gigi, konsultasi, dan cek
                jadwal dokter tanpa perlu download aplikasi.
              </p>

              <div className={styles.botButtons}>
                <a
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                    `Halo FDC Dental Clinic! Saya ${formData.namaLengkap} baru saja mendaftar dengan kode referral ${formData.kodeReferral}. Saya ingin reservasi perawatan gigi.`
                  )}`}
                  className={`${styles.botBtn} ${styles.botBtnWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat via WhatsApp
                </a>

                <a
                  href={`https://t.me/fdcdentalclinic_bot?start=ref_${formData.kodeReferral}`}
                  className={`${styles.botBtn} ${styles.botBtnTelegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  Chat via Telegram
                </a>
              </div>
            </div>

            <div className={styles.accountInfo}>
              <p className={styles.accountInfoText}>
                Detail akun telah dikirim ke <strong>{formData.email}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="24" fill="#00a0e3" />
              <path
                d="M16 14C16 14 18 12 24 12C30 12 32 14 32 14C32 14 34 16 34 22C34 28 30 36 24 36C18 36 14 28 14 22C14 16 16 14 16 14Z"
                fill="white"
              />
              <path
                d="M21 18C21 18 22 20 24 20C26 20 27 18 27 18"
                stroke="#00a0e3"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="20" cy="22" r="1.5" fill="#00a0e3" />
              <circle cx="28" cy="22" r="1.5" fill="#00a0e3" />
            </svg>
          </div>
          <h1 className={styles.title}>FDC Dental Clinic</h1>
          <p className={styles.subtitle}>
            Buat akun untuk reservasi perawatan gigi dengan dokter profesional
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.fieldGroup}>
            <label htmlFor="namaLengkap" className={styles.label}>
              Nama Lengkap
            </label>
            <div className={styles.inputWrapper}>
              <svg
                className={styles.inputIcon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                id="namaLengkap"
                type="text"
                className={`${styles.input} ${errors.namaLengkap ? styles.inputError : ""}`}
                placeholder="Masukkan nama lengkap Anda"
                value={formData.namaLengkap}
                onChange={(e) => handleChange("namaLengkap", e.target.value)}
              />
            </div>
            {errors.namaLengkap && (
              <span className={styles.error}>{errors.namaLengkap}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <div className={styles.inputWrapper}>
              <svg
                className={styles.inputIcon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                id="email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                placeholder="contoh@email.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="nomorHP" className={styles.label}>
              Nomor HP
            </label>
            <div className={styles.inputWrapper}>
              <svg
                className={styles.inputIcon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              <input
                id="nomorHP"
                type="tel"
                className={`${styles.input} ${errors.nomorHP ? styles.inputError : ""}`}
                placeholder="08xxxxxxxxxx"
                value={formData.nomorHP}
                onChange={(e) => handleChange("nomorHP", e.target.value)}
              />
            </div>
            {errors.nomorHP && (
              <span className={styles.error}>{errors.nomorHP}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.inputWrapper}>
              <svg
                className={styles.inputIcon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                placeholder="Minimal 8 karakter"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="konfirmasiPassword" className={styles.label}>
              Konfirmasi Password
            </label>
            <div className={styles.inputWrapper}>
              <svg
                className={styles.inputIcon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="konfirmasiPassword"
                type={showKonfirmasi ? "text" : "password"}
                className={`${styles.input} ${errors.konfirmasiPassword ? styles.inputError : ""}`}
                placeholder="Ulangi password Anda"
                value={formData.konfirmasiPassword}
                onChange={(e) =>
                  handleChange("konfirmasiPassword", e.target.value)
                }
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowKonfirmasi(!showKonfirmasi)}
                aria-label={showKonfirmasi ? "Sembunyikan password" : "Tampilkan password"}
              >
                {showKonfirmasi ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.konfirmasiPassword && (
              <span className={styles.error}>
                {errors.konfirmasiPassword}
              </span>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="kodeReferral" className={styles.label}>
              Kode Referral
              <span className={styles.labelOptional}>(opsional)</span>
            </label>
            <div className={styles.inputWrapper}>
              <svg
                className={styles.inputIcon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 12 20 22 4 22 4 12" />
                <rect x="2" y="7" width="20" height="5" />
                <line x1="12" y1="22" x2="12" y2="7" />
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
              <input
                id="kodeReferral"
                type="text"
                className={styles.input}
                placeholder="Masukkan kode referral"
                value={formData.kodeReferral}
                onChange={(e) => handleChange("kodeReferral", e.target.value)}
              />
            </div>
            <span className={styles.hint}>
              Gunakan kode referral untuk mendapatkan poin gratis!
            </span>
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={formData.setujuSyarat}
                onChange={(e) => handleChange("setujuSyarat", e.target.checked)}
              />
              <span className={styles.checkboxText}>
                Saya menyetujui{" "}
                <a href="#" className={styles.link}>
                  Syarat & Ketentuan
                </a>{" "}
                dan{" "}
                <a href="#" className={styles.link}>
                  Kebijakan Privasi
                </a>{" "}
                FDC Dental Clinic
              </span>
            </label>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting || !formData.setujuSyarat}
          >
            {isSubmitting ? (
              <span className={styles.spinner} />
            ) : (
              "Daftar Sekarang"
            )}
          </button>

          <p className={styles.loginText}>
            Sudah punya akun?{" "}
            <a href="#" className={styles.link}>
              Masuk di sini
            </a>
          </p>
        </form>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2025 FDC Dental Clinic. All rights reserved.</p>
        <p>Dental health is our struggle!</p>
      </footer>
    </div>
  );
}
