const express = require('express'); 
const bodyParser = require('body-parser');
const app = express(); 
app.use(bodyParser.json());

let veiculos = [];

app.get('/veiculos', (req, res) => { 
    res.json(veiculos); 
    });

    
app.get('/veiculos/:placa', (req, res) => { 
    const { placa } = req.params; 
    const veiculo = veiculos.find(v => v.placa === placa); 
if (veiculo) { 
    res.json(veiculo); 
} else { 
    res.status(404).json({ message: 'Veículo não encontrado.' }); 
} 
});

app.post('/veiculos', (req, res) => { 
    const { placa, marca, modelo, ano } = req.body; 
    const veiculo= { placa, marca, modelo, ano }; 
    veiculos.push(veiculo); 
    res.status(201).json({ message: 'Veículo cadastrado com sucesso.' }); 
    });

app.put('/veiculos/:placa', (req, res) => { 
        const { placa } = req.params; 
        const { marca, modelo, ano } = req.body; 
        const veiculo= veiculos.find(v => v.placa === placa); 
        if (veiculo) { 
        veiculo.marca = marca || veiculo.marca; 
        veiculo.modelo = modelo || veiculo.modelo; 
        veiculo.ano = ano || veiculo.ano; 
        res.json({ message: 'Informações do veículo atualizadas com sucesso.' });
        } else {
        res.status(404).json({ message: 'Veículo não encontrado.' }); 
        } 
        });

    app.delete('/veiculos/:placa', (req, res) => { 
const { placa } = req.params; 
const veiculoIndex = veiculos.findIndex(v => v.placa === placa); 
if (veiculoIndex !== -1) { 
veiculos.splice(veiculoIndex, 1); 
res.json({ message: 'Veículo excluído com sucesso.' }); 
} else { 
res.status(404).json({ message: 'Veículo não encontrado.' }); 
} 
});


const port = 3000; 
app.listen(port, () => { 
console.log(`Servidor rodando em http://localhost:${port}`); 
});
