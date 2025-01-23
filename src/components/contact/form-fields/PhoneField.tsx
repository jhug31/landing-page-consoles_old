import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ContactFormData } from "../ContactFormFields";

interface PhoneFieldProps {
  form: UseFormReturn<ContactFormData>;
}

const PhoneField = ({ form }: PhoneFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Téléphone (optionnel)</FormLabel>
          <FormControl>
            <Input placeholder="Votre numéro" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhoneField;