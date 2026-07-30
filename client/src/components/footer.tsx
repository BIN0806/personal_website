export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-sm text-background/70 text-center">
          © {new Date().getFullYear()} Billy Nguyen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
