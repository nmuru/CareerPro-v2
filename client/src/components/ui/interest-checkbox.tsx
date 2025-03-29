import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface InterestCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function InterestCheckbox({ id, label, checked, onChange }: InterestCheckboxProps) {
  return (
    <div className="flex items-center space-x-3">
      <Checkbox 
        id={id} 
        checked={checked} 
        onCheckedChange={onChange}
        className="w-5 h-5 text-[#0A66C2] rounded border-gray-300 focus:ring-[#0A66C2] cursor-pointer"
      />
      <Label 
        htmlFor={id} 
        className="cursor-pointer text-gray-800 dark:text-gray-200"
      >
        {label}
      </Label>
    </div>
  );
}
