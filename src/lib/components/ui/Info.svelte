<script>
import * as Popover from "$lib/components/ui/popover/index.js";
import  Infos  from '@lucide/svelte/icons/info';


import { cn } from "$lib/utils.js";

	let {
		class: className,
		children,
        sideOffset=1,
		...restProps
	} = $props();
</script>


<Popover.Root >
    <Popover.Trigger class={className}><Infos/></Popover.Trigger>
    <Popover.Content {sideOffset}>
        {@render children?.()}
    </Popover.Content>
</Popover.Root>