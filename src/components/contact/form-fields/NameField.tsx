import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ContactFormData } from "../ContactFormFields";

interface NameFieldProps {
  form: UseFormReturn<ContactFormData>;
}

const NameField = ({ form }: NameFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nom</FormLabel>
          <FormControl>
            <Input placeholder="Votre nom" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NameField;