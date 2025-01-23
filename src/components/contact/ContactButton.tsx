import { Button } from "@/components/ui/button";

interface ContactButtonProps {
  onClick: () => void;
}

const ContactButton = ({ onClick }: ContactButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="bg-[#ea384c] hover:bg-[#ea384c]/90 text-black font-bold px-8 py-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 text-lg"
    >
      Demandez une offre
    </Button>
  );
};

export default ContactButton;