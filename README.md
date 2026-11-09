# Aabha Jewels

A jewellery store website. Customers browse, add to cart and send their order to you on WhatsApp. You add new collections and pieces from a built-in owner panel.

It is a plain static site (no build step, no database):

| File | What it is |
| --- | --- |
| `index.html` | The page shell |
| `styles.css` | All the styling |
| `app.js` | The store: shop, cart, checkout, owner panel |
| `store.json` | **Your catalogue**: settings, collections, products and their photos |
| `vercel.json` | Hosting settings for Vercel |

## 1. Put it on GitHub

1. Sign in at github.com and click **New repository**. Name it `aabha-jewels`. Choose **Public** or **Private**, then **Create repository**.
2. On the new repo page click **uploading an existing file**.
3. Unzip this folder, then drag **all the files** into the upload box: `index.html`, `styles.css`, `app.js`, `store.json`, `vercel.json`, `.gitignore`, `README.md`. (Drag the files, not the folder.)
4. Click **Commit changes**.

## 2. Host it on Vercel

1. Go to vercel.com and sign in with **Continue with GitHub**.
2. Click **Add New → Project** and import the `aabha-jewels` repo.
3. Leave every setting as it is. Framework Preset: **Other**. No build command. No output directory.
4. Click **Deploy**. In about a minute you get a link like `aabha-jewels.vercel.app`.

Every time a file in the repo changes, Vercel redeploys the site automatically.

## 3. Set up the owner panel (one time)

The owner panel saves your changes by committing `store.json` to your repo. You need a GitHub token for that.

1. On GitHub open **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Name it `aabha-jewels-admin`. Set an expiry (for example 1 year).
3. Under **Repository access** choose **Only select repositories** and pick `aabha-jewels`.
4. Under **Permissions → Repository permissions** set **Contents** to **Read and write**.
5. Click **Generate token** and copy it (it starts with `github_pat_`). You see it only once.

Now open your live site, scroll to the footer and tap **Owner login** (or open `your-site.vercel.app/#admin`). Enter:

- Repository: `your-username/aabha-jewels`
- Branch: `main`
- Token: the one you just copied

The token stays in your browser only. Customers never see the owner bar.

## 4. Add a new collection when new jewellery arrives

1. Open **Manage store → Collections**, give the collection a name and a line of description, then **Create collection**. The newest collection is featured at the top of the home page.
2. Go to **Add piece**, fill in the name, prices, stock and badge, and add up to 4 photos. Repeat for each piece.
3. Click **Publish changes**. After about a minute the live site shows the new collection.

You can also edit or delete pieces, change stock, and update the WhatsApp number, UPI ID, coupon, shipping and sale timer under **Settings**.

## Before you open the shop

- **Replace the sample data.** The prices, stock counts, badges and descriptions are placeholders. Check every piece.
- **Photos.** Use your own photos, or ones you have permission to use. Some of the sample photos came from other shops and carry watermarks.
- **Add your WhatsApp number** in Settings, with the country code and no plus sign (for example `919876543210`). Orders are sent there.
- **Payments.** There is no online payment. Customers send their order on WhatsApp, and you confirm it and collect payment by UPI or cash on delivery.
- **Keep photos small.** Photos are stored inside `store.json`. Around 100 pieces with 1 to 2 photos each is fine. If the file gets very large, tell me and I'll move the photos to separate files.

## Run it on your computer (optional)

Opening `index.html` directly will not work because the browser blocks reading `store.json`. Use a small local server:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Custom domain

In Vercel open your project, then **Settings → Domains**, and add your own domain. Vercel shows you the DNS records to set.
