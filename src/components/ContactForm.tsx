import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import ContactButton from "./contact/ContactButton";
import ContactFormFields, { ContactFormData } from "./contact/ContactFormFields";

interface ContactFormProps {
  files: { name: string; signedUrl: string }[];
}

const ContactForm = ({ files }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (values: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-form', {
        body: values,
      });

      if (error) throw error;

      toast({
        title: "Demande envoyée !",
        description: "Nous vous répondrons sous 24h.",
      });
      
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du formulaire.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <ContactButton onClick={() => setIsDialogOpen(true)} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Demande d'information</DialogTitle>
          </DialogHeader>
          <ContactFormFields 
            files={files}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactForm;