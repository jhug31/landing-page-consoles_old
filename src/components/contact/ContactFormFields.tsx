import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import NameField from "./form-fields/NameField";
import EmailField from "./form-fields/EmailField";
import PhoneField from "./form-fields/PhoneField";
import ProductField from "./form-fields/ProductField";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional(),
  products: z.array(z.string()).min(1, "Veuillez sélectionner au moins un produit"),
});

interface ContactFormFieldsProps {
  files: { name: string; signedUrl: string }[];
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  isSubmitting: boolean;
}

export type ContactFormData = z.infer<typeof formSchema>;

const ContactFormFields = ({ files, onSubmit, isSubmitting }: ContactFormFieldsProps) => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      products: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <NameField form={form} />
        <EmailField form={form} />
        <PhoneField form={form} />
        <ProductField form={form} files={files} />
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactFormFields;