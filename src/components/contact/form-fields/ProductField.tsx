import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ContactFormData } from "../ContactFormFields";
import { useProductInfo } from "@/hooks/useProductInfo";

interface ProductFieldProps {
  form: UseFormReturn<ContactFormData>;
  files: { name: string; signedUrl: string }[];
}

const ProductField = ({ form, files }: ProductFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="product"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Produit d'intérêt</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un produit" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {files.map((file, index) => {
                const { description } = useProductInfo(file.name);
                return (
                  <SelectItem key={index} value={file.name}>
                    {description || "Nouvelle cartouche"}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductField;