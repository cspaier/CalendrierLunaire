<script>
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import {Switch} from "$lib/components/ui/switch";
    import {Label} from "$lib/components/ui/label";
    import Info from "./ui/Info.svelte";
    import Telecharger from "./doc/Telecharger.svelte";

    import QRCode from 'qrcode-svg';
    
    const urlQrCode = "https://spaier.fr/lune";
    let button;
    let afficherQrCode = true;
    export let calendrierDiv;
    
    /**
     * Retourne un QrCode à intégrer dans un svg.
     * Il faut repenser le positionnement.
     * @param svg
     */
    function getQrCode(svg){
        const qr = new QRCode({
            content: urlQrCode,
            padding: 0,
            width: 100,
            height: 100,
            color: "#000000",
            background: "#ffffff",
            xmlDeclaration: false,
        });
        
        const parser = new DOMParser();
        const qrDoc = parser.parseFromString(qr.svg(), "image/svg+xml");
        const qrElement = qrDoc.documentElement;
        
        qrElement.setAttribute("x", svg.viewBox?.baseVal?.width - 110 || svg.getAttribute("width") - 110);
        qrElement.setAttribute("y", svg.viewBox?.baseVal?.height - 110 || svg.getAttribute("height") - 110);
        return qrElement;
    }

    /**
     * Télécharge le calendrier au format svg.
     */
    function telecharger(){
        const svg = calendrierDiv.querySelector('svg');
        if (!svg) {
            console.warn("SVG introuvable");
            return;
        }
        // Clone pour ne pas toucher au DOM
        const svgClone = svg.cloneNode(true);
        
        // Ajout des namespaces si manquants
        if (!svgClone.getAttribute('xmlns')) {
            svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        }
        if (!svgClone.getAttribute('xmlns:xlink')) {
            svgClone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        }
        
        if (afficherQrCode){
            svgClone.appendChild(getQrCode(svgClone));
        }

        const svgString = svgClone.outerHTML;
        var blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        
        // ajout d'un a temporaire pour le téléchargement
        const a = document.createElement('a')
        var href = URL.createObjectURL(blob);
        
        a.href = href;
        a.download = "calendrierLunaire.svg";
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    } 
    
</script>

<Card.Root> 
    <Card.Content class="flex justify-between content-center">

    <Button bind:this={button}  onclick={telecharger}>🖨 Télécharger</Button>
    <div class="space-x-4 grow flex justify-end">

    <div class="flex items-center space-x-2">
        <Switch id="AfficherQrCode" bind:checked={afficherQrCode} />
        <Label for="AfficherQrCode">Ajouter un QR code </Label>
    </div>
    <Info><Telecharger /></Info>
    </div>
</Card.Content>
</Card.Root>

<style>

</style>