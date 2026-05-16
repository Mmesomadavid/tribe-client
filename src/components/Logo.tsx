import logo from '../assets/tribe.svg';

const Logo = ({ className = '' }: { className?: string }) => {
  return (
    <img
      src={logo}
      alt="Tribe"
      className={`h-28 w-28 object-contain ${className}`}
    />
  );
};

export default Logo;