<script>
    import data from "../../../dataJson/catalogue.json";
    import Footer from "../../components/Footer.svelte";
    import Header from "./Header.svelte";
    
    let selectedFournisseur = null;
    let selectedCabinet = null;
    let selectedSendingCard = null;

    function selectFournisseur(event) {
        const selectedIndex = event.target.value;
        selectedFournisseur = data[0].fournisseur[selectedIndex];
    }

    function selectCabinet(event) {
        const selectedIndex = event.target.value;
        selectedCabinet = data[1].modelecabinet[selectedIndex];
    }

    function selectSendingCard(event) {
        const selectedIndex = event.target.value;
        selectedSendingCard = data[2].sendingcard[selectedIndex];
    }
</script>

<Header />

<div class="allInfo">
    <h1>Catalogue des Articles</h1>

    <section class="one">
        <h2>Fournisseurs</h2>
        <form>
            <label for="fournisseur-select">Choisissez un fournisseur :</label>
            <select id="fournisseur-select" on:change={selectFournisseur}>
                <option value="">-- Sélectionnez un fournisseur --</option>
                {#each data[0].fournisseur as fournisseur, index}
                    <option value={index}>{fournisseur.name} - Code: {fournisseur.code}</option>
                {/each}
            </select>
            
            {#if selectedFournisseur}
                <div>
                    <h3>Informations du fournisseur sélectionné</h3>
                    <label>Nom du fournisseur :</label>
                    <input type="text" bind:value={selectedFournisseur.name} />

                    <label>Alias :</label>
                    <input type="text" value={selectedFournisseur.aka.join(', ')} />

                    <label>Code :</label>
                    <input type="text" bind:value={selectedFournisseur.code} />
                </div>
            {/if}
        </form>
    </section>
</div>

<div class="allInfo">
    <section class="two">
        <h2>Cabinets</h2>
        <form>
            <label for="cabinet-select">Choisissez un cabinet :</label>
            <select id="cabinet-select" on:change={selectCabinet}>
                <option value="">-- Sélectionnez un cabinet --</option>
                {#each data[1].modelecabinet as cabinet, index}
                    <option value={index}>{cabinet.name} - Code: {cabinet.code} - Pitch: {cabinet.pitch}</option>
                {/each}
            </select>
    
            {#if selectedCabinet}
                <div>
                    <h3>Informations du cabinet sélectionné</h3>
                    <label>Nom du cabinet :</label>
                    <input type="text" bind:value={selectedCabinet.name} />

                    <label>Code :</label>
                    <input type="text" bind:value={selectedCabinet.code} />

                    <label>Pitch :</label>
                    <input type="text" bind:value={selectedCabinet.pitch} />
                </div>

                <div class="model-info">
                    <h3>Modèle</h3>

                    <label>Câble cuivre :</label>
                    <input type="checkbox" bind:checked={selectedCabinet.modèle[0].copperWire} />

                    <label>Câble or :</label>
                    <input type="checkbox" bind:checked={selectedCabinet.modèle[0].goldWire} />

                    <label>LED noir :</label>
                    <input type="checkbox" bind:checked={selectedCabinet.modèle[0].blackled} />

                    <label>LED blanc :</label>
                    <input type="checkbox" bind:checked={selectedCabinet.modèle[0].whiteled} />

                    <label>Extérieur :</label>
                    <input type="checkbox" bind:checked={selectedCabinet.modèle[0].outdoor} />

                    <label>Intérieur :</label>
                    <input type="checkbox" bind:checked={selectedCabinet.modèle[0].indoor} />
                </div>
            {/if}
        </form>
    </section>
</div>

<div class="allInfo">
    <section class="three">
        <h2>Sending Card</h2>
        <label for="sending-card-select">Choisissez une Sending Card</label>
        <select id="sending-card-select" on:change={selectSendingCard}>
            <option value="">-- Sélectionnez une Sending Card --</option>
            {#each data[2].sendingcard as sendingCard, index}
                <option value={index}>{sendingCard.name}</option>
            {/each}
        </select>

        {#if selectedSendingCard}
            <div>
                <h3>Informations de la Sending Card sélectionnée</h3>
                <label>Nom :</label>
                <input type="text" bind:value={selectedSendingCard.name} />
            </div>
        {/if}
    </section>
</div>

<Footer />

<style>
    * {
        box-sizing: border-box; 
        margin: 0;
        padding: 0;
    }

    .allInfo {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
        text-align: center;
        color: #4CAF50;
        margin-bottom: 20px;
    }

    section {
        margin-bottom: 20px;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #fafafa;
    }

    h2 {
        text-align: center;
        margin-bottom: 10px;
        color: #333;
    }

    label {
        font-weight: bold;
        margin: 5px 0;
    }

    h3 {
        font-size: 1em;
        text-align: center;
        color: cadetblue;
    }

    select, input[type="text"] {
        display: block;
        width: 100%; 
        padding: 10px; 
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        transition: border-color 0.3s; 
    }

    select:focus, input[type="text"]:focus {
        border-color: #4CAF50; 
    }

    input[type="checkbox"] {
        margin-right: 5px;
    }

    .model-info {
        background-color: #ffe0b2;
        padding: 10px;
        border: 1px solid #ffcc80; 
        border-radius: 4px;
        margin-top: 10px; 
    }
</style>


