<script>
    import  Settings  from '@lucide/svelte/icons/settings';
    import  Infos  from '@lucide/svelte/icons/info';
    import Github from '@lucide/svelte/icons/github';
    import DarkLightSwitch from "./DarkLightSwitch.svelte";
    import Button from './ui/button/button.svelte';
    import { buttonVariants } from "$lib/components/ui/button/index.js";

    export let ongletActif;
</script>

<aside class="bg-background inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
    <nav class="flex flex-col items-center gap-4 px-2 py-4">
    <DarkLightSwitch />
    <Button variant={ongletActif === 'reglages' ? 'default' : 'ghost'}
    onclick={() => {
        ongletActif = 'reglages';
        console.log(ongletActif)
    }}>
        <Settings class="h-4 w-4 transition-all group-hover:scale-110" />
    </Button>

      <Button variant={ongletActif === 'documentation' ? 'default' : 'ghost'}
      onclick={() => {
          ongletActif = 'documentation';
          console.log(ongletActif)
      }}>
        <Infos/>
      </Button>

      <a href="https://github.com/cspaier/CalendrierLunaire" target="_blank">
        <Github />
    </a>

    </nav>
</aside>