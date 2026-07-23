import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "cursor-pointer border-none px-4 py-[9px] rounded-[9px] text-[12.5px] font-medium font-sans transition-opacity disabled:opacity-60 disabled:cursor-default",
  {
    variants: {
      variant: {
        solid: "bg-teal text-white",
        outline: "bg-transparent text-ink-muted border border-border",
        danger: "bg-coral text-white",
        dangerOutline: "bg-transparent text-coral border-[1.5px] border-coral",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  }
)

function Button({
  className,
  variant = "solid",
  onClick,
  disabled,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
