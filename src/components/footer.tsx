import Image from "next/image";

export default function Footer() {
  return (
    <footer className="my-4 p-4 flex flex-col items-center">
        <Image src="/graphic.svg" alt="graphic lines green" width={180} height={60} />
    </footer>
  );
}
