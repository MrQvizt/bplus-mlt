import logo from '@/assets/benefitplus-logo.svg';

const Header = () => {
  return (
    <header className="bg-background py-4 px-4">
      <div className="flex flex-col items-start">
        <img src={logo} alt="Benefitplus" className="h-10 w-auto" />
        <p className="text-xs text-muted-foreground mt-1">Smart savings, close to you</p>
      </div>
    </header>
  );
};

export default Header;
