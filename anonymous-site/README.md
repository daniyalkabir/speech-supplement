# Anonymous Speech Supplement Site

This static site serves as a supplement for your paper, presenting graphs and audio for multiple target phrases using different models.

## Folder Structure

```
/ (repo root)
├── index.html
├── styles.css
├── app.js
├── config.json
├── .nojekyll
└── assets/
    ├── images/
    │   ├── ecapa/
    │   │   ├── target01.png
    │   │   ├── ...
    │   ├── resnet/
    │   │   ├── target01.png
    │   └── scatter/
    │       ├── target01.png
    │       ├── ...
    └── audio/
        ├── target01/
        │   ├── original.wav
        │   └── adversarial.wav
        ├── target02/
        │   ├── original.wav
        │   └── adversarial.wav
        └── ...
```

Add your own images and audio files following the naming pattern. If a file is missing, it will simply not be displayed.

## Config

The `config.json` file defines the list of targets shown at the top of the page and in the captions. Each entry has an `"id"` corresponding to the file names and a `"text"` for display. For example:

```json
[
    {
        "id": "target01",
        "text": "open the door"
    },
    {
        "id": "target02",
        "text": "play the radio"
    }
]
```

Update the `"text"` fields to match your 18 target phrases. You can add or remove objects to change the number of targets.

## Deployment

To publish anonymously via GitHub Pages:

1. Create a new GitHub account without personal identifiers.
2. Create a new public repository (e.g. `speech-supplement`).
3. Upload all files and folders from this directory to the root of the repository.
4. In the repository **Settings → Pages**, under **Build and deployment**, set:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/` (root)
5. Click **Save**. GitHub will provide a URL like `https://<username>.github.io/<repo-name>/`.

Place that URL in your paper to link readers to this supplement.

The `.nojekyll` file ensures GitHub Pages serves files in the `assets` folders without processing.

## Customisation

- To change styling, edit `styles.css`.
- To adjust layout or behaviour, edit `app.js` and `index.html`.
- To add new categories or sections, modify `index.html` and expand the logic in `app.js`.

This project uses plain HTML, CSS and vanilla JavaScript so there are no build steps.