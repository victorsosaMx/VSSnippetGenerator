function generateSnippet() {
    const shortcut = document.getElementById('shortcut').value;
    const name = document.getElementById('name').value;
    const output = document.getElementById('output').value;
    const code = document.getElementById('code').value;
    let snippet = '';

    if (output === 'vscode') {
        snippet = generateVSCodeSnippet(shortcut, name, code);
    } else {
        snippet = generateVS2022Snippet(shortcut, name, code);
    }

    document.getElementById('result').value = snippet;
    document.getElementById('download').disabled = false;
}

function generateVSCodeSnippet(shortcut, name, code) {
    return JSON.stringify({
        [name]: {
            prefix: shortcut,
            body: code.split('\n'),
            description: name
        }
    }, null, 2);
}

function generateVS2022Snippet(shortcut, name, code) {
    return `<?xml version="1.0" encoding="utf-8"?>
<CodeSnippets xmlns="http://schemas.microsoft.com/VisualStudio/2005/CodeSnippet">
<CodeSnippet Format="1.0.0">
<Header>
    <Title>${name}</Title>
    <Shortcut>${shortcut}</Shortcut>
    <Description>${name}</Description>
    <Author>VS Snippet Generator</Author>
    <SnippetTypes>
        <SnippetType>Expansion</SnippetType>
    </SnippetTypes>
</Header>
<Snippet>
    <Code Language="csharp">
        <![CDATA[${code}]]>
    </Code>
</Snippet>
</CodeSnippet>
</CodeSnippets>`;
}

function downloadSnippet() {
    const name = document.getElementById('name').value;
    const output = document.getElementById('output').value;
    const snippet = document.getElementById('result').value;
    const fileName = output === 'vscode' ? `${name}.code-snippets` : `${name}.snippet`;
    
    const blob = new Blob([snippet], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}