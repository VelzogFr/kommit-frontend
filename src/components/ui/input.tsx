import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-[43px] w-full min-w-0 rounded-field border border-b-2 border-input bg-background px-3 text-sm text-muted-foreground transition-colors outline-none placeholder:text-placeholder focus-visible:border-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
