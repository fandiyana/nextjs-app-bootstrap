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
              Selamat, akun Anda telah berhasil dibuat. Silakan cek email Anda
              untuk verifikasi akun.
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
            <a
              href="https://link.fdcdentalclinic.co.id/download"
              className={styles.downloadBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Aplikasi FDC
            </a>
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
