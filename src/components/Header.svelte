<script>
    // import logo from '$lib/images/logo.svg';
</script>

<header>
    <div class="logo">
        <a href="/">
            <!-- <img src={logo} alt="Mon Logo" /> -->
        </a>
    </div>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
			<li><a href="/pages/screenEditor">Screen configuration</a></li>
			<li><a href="/pages/catalog">Catalog</a></li>
        </ul>
    </nav>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1em;
        background-color: #f8f9fa;
        border-bottom: 1px solid #dee2e6;
    }

    /* .logo img {
        height: 40px; 
    } */

    nav ul {
        list-style: none;
        display: flex;
        gap: 1em; 
        margin: 0;
        padding: 0;
    }

    nav a {
        text-decoration: none;
        color: #343a40; 
        font-weight: 600;
        transition: color 0.2s;
    }

    nav a:hover {
        color: #007bff; 
    }
</style>