"use client";
import CertificadoButton from "@/components/CertificadoButton/CertificadoButton";
import HeaderLayout from "../headerLayour";
import { useEffect, useState } from "react";
import axios from "axios";
import style from "./certificados.module.css";

interface Certificate {
  _id: string;
  name: string;
  dni: string;
  curso: string;
  timestamp: string;
}

export default function Certificados() {
  const [certificate, setCertificate] = useState<Certificate[]>([]);

  useEffect(() => {
    try {
      axios.get("/api/certificate").then((response) => {
        setCertificate(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <HeaderLayout>
      <section className={style.certificados}>
        <h1>Mis Certificados</h1>
        <div className={style.certificadoContainer}>
          {certificate.length > 0 ? (
            certificate.map((certificado: Certificate, index: number) => (
              <CertificadoButton
                nombre={certificado.name}
                curso={certificado.curso}
                key={index}
                id={certificado._id}
              />
            ))
          ) : (
            <p>No hay certificados registrados</p>
          )}
        </div>
      </section>
    </HeaderLayout>
  );
}
