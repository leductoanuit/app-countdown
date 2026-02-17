import Image from "next/image";

interface MomoQrLiXiProps {
  className?: string;
}

/** MoMo QR code card inviting users to send li xi (lucky money) */
export default function MomoQrLiXi({ className = "" }: MomoQrLiXiProps) {
  return (
    <section
      aria-label="Gửi lì xì qua MoMo"
      className={`rounded-xl border-2 border-tet-gold-primary/30 bg-black/30 backdrop-blur-sm p-6 text-center max-w-xs mx-auto ${className}`}
      style={{ animation: "fadeIn 0.8s ease-out 1.5s both" }}
    >
      <p
        className="text-lg font-bold text-tet-gold-primary mb-3"
        style={{ textShadow: "0 0 12px var(--tet-glow-gold)" }}
      >
        Lì xì cho chủ nhà nhé!
      </p>

      <Image
        src="/momo-qr-li-xi.jpg"
        alt="MoMo QR - Quét mã để gửi lì xì"
        width={200}
        height={200}
        className="rounded-lg mx-auto"
      />

      <p className="text-sm text-tet-gold-secondary/70 mt-3">
        Quét mã để gửi lì xì ~
      </p>
      <p className="text-xs text-tet-gold-secondary/50 mt-1">
        LÊ ĐỨC TOÀN - MoMo / VietQR
      </p>
    </section>
  );
}
