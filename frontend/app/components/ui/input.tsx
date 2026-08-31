import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "w-full border border-border bg-transparent px-4 py-2 text-[12.5px] text-ink placeholder:text-ink-faint rounded-xl font-sans transition-colors focus:outline-none focus:ring-2 focus:ring-teal/30 disabled:opacity-60 disabled:cursor-default",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Input({
  className,
  variant = "default",
  ...props
}: InputPrimitive.Props & VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
