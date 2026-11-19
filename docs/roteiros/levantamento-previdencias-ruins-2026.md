# Levantamento: fundos de previdência com rentabilidade ruim (dados até 17/11/2026)

**Fonte primária:** Dados Abertos da CVM; SES/SUSEP para a seção de carregamento; (cotas diárias, cadastro de classes e extrato de informações dos fundos) e Banco Central (CDI: série SGS 12; IPCA: série SGS 433).
**Data-base:** cota de 17/11/2026. Janelas: 12 meses (desde 17/11/2025), 3 anos, 5 anos e 10 anos (desde 17/11/2016).
**Universo:** 4.365 classes classificadas pela Anbima como "Previdência" e em funcionamento normal.

## Referências do período

| Janela | CDI acumulado | IPCA acumulado |
|---|---|---|
| 12 meses | 14,19% | 4,63% |
| 3 anos | 44,23% | 14,74% |
| 5 anos | 82,75% | 28,05% |
| 10 anos | 137,24% | 62,15% |

---

## 1. O número que resume tudo

Recorte: fundos de previdência **conservadores pós-fixados** (renda fixa de duração baixa, média ou livre, sem fundos de inflação, IMA-B ou data-alvo), com **patrimônio acima de R$ 500 milhões**, nos últimos 5 anos:

- Fundos com **taxa de administração de até 0,5% a.a.** entregaram, na mediana, **99,4% do CDI**.
- Fundos com **taxa de 1,5% a.a. ou mais** entregaram, na mediana, **80,0% do CDI**.
- Esses 44 fundos caros somam **R$ 163,7 bilhões** de patrimônio.

> Frase para o vídeo: *"Hoje existem mais de R$ 160 bilhões parados em fundos de previdência conservadores que cobram 1,5% ao ano ou mais. Nos últimos cinco anos, eles entregaram em média só 80% do CDI. Os fundos baratos, com o mesmo tipo de investimento, entregaram praticamente 100%."*

---

## 2. Os piores casos: 10 anos de rentabilidade

Fundos conservadores pós-fixados, patrimônio acima de R$ 500 milhões, ordenados pelo pior % do CDI em 10 anos. A taxa de administração é a registrada no extrato mais recente enviado à CVM.

| # | Fundo | CNPJ | Taxa adm. | Patrimônio | % CDI 12m | % CDI 5a | % CDI 10a | R$ 100 mil viraram (10a) |
|---|---|---|---|---|---|---|---|---|
| 1 | **Caixa 300 Previdenciário FIC RF** | 03.926.431/0001-71 | **3,00%** | R$ 4,9 bi | 67% | 66% | **60%** | R$ 182,7 mil |
| 2 | **Caixa 250 Previdenciário FIC RF** | 11.061.385/0001-00 | 2,50% | R$ 4,7 bi | 71% | 70% | 67% | R$ 192,0 mil |
| 3 | **BrasilPrev RT Fix FIC RF** | 03.537.379/0001-61 | 2,00% | R$ 4,1 bi | 80% | 76% | 70% | R$ 196,7 mil |
| 4 | **Bradesco Prev Fácil PGBL Fix** | 02.561.139/0001-30 | 2,00% | R$ 1,5 bi | 84% | 79% | 71% | R$ 198,0 mil |
| 5 | **Bradesco VGBL Fix** | 04.830.277/0001-00 | 2,00% | R$ 4,9 bi | 84% | 80% | 72% | R$ 198,1 mil |
| 6 | **BrasilPrev RT Fix III FIC RF** | 03.601.000/0001-35 | 2,00% | R$ 3,4 bi | 80% | 76% | 72% | R$ 198,7 mil |
| 7 | **Itaú Flexprev I FIF CIC RF** | 02.911.408/0001-40 | 1,75% | R$ 1,6 bi | 84% | 80% | 73% | R$ 200,2 mil |
| 8 | **Santander I RF Crédito Privado** | 07.199.289/0001-69 | 3,20% | R$ 0,7 bi | 83% | 81% | 73% | R$ 200,5 mil |
| 9 | **Caixa 200 Previdenciário FIC RF** | 03.737.222/0001-80 | 2,00% | R$ 5,6 bi | 75% | 75% | 74% | R$ 201,8 mil |
| 10 | **Santander Prev Fix RF Crédito Privado** | 02.498.190/0001-44 | 2,00% | R$ 1,0 bi | 83% | 81% | 74% | R$ 201,9 mil |
| 11 | **BrasilPrev RT Fix V FIC RF** | 03.601.017/0001-92 | 2,00% | **R$ 8,4 bi** | 80% | 76% | 76% | R$ 204,0 mil |
| 12 | **Itaú Flexprev Plus FIF CIC RF** | 02.290.280/0001-45 | 1,75% | R$ 3,9 bi | 84% | 80% | 78% | R$ 207,6 mil |

**Comparação:** R$ 100 mil no CDI viraram **R$ 237,2 mil** em 10 anos. A inflação do período levaria os mesmos R$ 100 mil a R$ 162,2 mil.

**Destaques para o vídeo:**
- **Caixa 300:** em 10 anos, entregou só 60% do CDI. Descontada a inflação, o ganho real foi de **12,7% em 10 anos**, cerca de **1,2% ao ano**. O CDI deu 46,3% de ganho real no mesmo período. Quem tinha R$ 100 mil deixou de ganhar **R$ 54,5 mil** em relação ao CDI.
- **O número no nome é a taxa:** na Caixa, o número no nome do fundo corresponde à taxa de administração. Caixa 300 cobra 3,00%, Caixa 250 cobra 2,50%, Caixa 200 cobra 2,00% e Caixa 70 cobra 0,70%.
- **BrasilPrev RT Fix V:** o maior da lista, com R$ 8,4 bilhões, entregou 76% do CDI em 10 anos.
- **Santander I:** cobra 3,20% ao ano num fundo de renda fixa.

Planilha com os 30 piores e as duas referências enviadas: [`dados/previdencia_piores_posfixados_2026-11.csv`](dados/previdencia_piores_posfixados_2026-11.csv)

---

## 3. Os dois fundos que vocês enviaram

| Fundo | CNPJ | Tipo | Taxa adm. | Patrimônio | % CDI 12m | % CDI 3a | % CDI 5a | % CDI 10a | R$ 100 mil em 10a |
|---|---|---|---|---|---|---|---|---|---|
| **Bradesco VGBL V1530 FIF CIC Mult RL** | 04.830.289/0001-27 | Multimercado Livre | **3,00%** | R$ 0,37 bi | 81% | 81% | 78% | 79% | R$ 208,2 mil |
| **Caixa 70 Previdenciário FIC RF RL** | 08.070.846/0001-00 | RF Duração Livre | 0,70% | R$ 9,8 bi | 85% | 87% | 88% | 94% | R$ 229,5 mil |

**Leitura:**
- **Bradesco V1530** é um bom exemplo: é um **multimercado** (deveria buscar ganhar do CDI), cobra **3% ao ano** e entregou **cerca de 79% do CDI em todas as janelas** de 1, 3, 5 e 10 anos. Ou seja, assume mais risco que a renda fixa e entrega menos.
- **Caixa 70** é um caso mais moderado: taxa de 0,70% e 88–94% do CDI. É bem pior que os fundos baratos (perto de 100%), mas não é dos piores. Para mostrar o contraste dentro da própria Caixa, funciona melhor ao lado do **Caixa 300**: mesma casa, mesma estratégia, 70 com 94% do CDI em 10 anos e 300 com 60%.

---

## 4. "Perdeu para a inflação": casos reais

**a) Período de juros baixos (nov/2018 a nov/2021, 3 anos).** IPCA de 17,9% e CDI de 10,0%. Nesse período até o CDI perdeu da inflação, mas os fundos caros perderam quase o dobro:

| Fundo | Rentabilidade em 3 anos | Perda real (descontado o IPCA) |
|---|---|---|
| Caixa 300 | 5,0% | **−10,9%** |
| Caixa 250 | 6,6% | −9,6% |
| Bradesco VGBL Fix | 7,0% | −9,3% |
| Santander I | 7,0% | −9,2% |
| BrasilPrev RT Fix | 7,5% | −8,8% |
| Bradesco V1530 (multimercado) | 9,5% | −7,1% |
| *CDI* | *10,0%* | *−6,7%* |

> Frase para o vídeo: *"Entre 2018 e 2021, quem estava no Caixa 300 perdeu quase 11% de poder de compra. Ou seja, o dinheiro passou três anos no 'investimento' e comprava menos do que antes."*

**b) Multimercado com exterior nos últimos 5 anos:** o **BrasilPrev Top ESG Multimercado Investimento no Exterior** (CNPJ 31.975.598/0001-68, R$ 500 milhões) tem rentabilidade **negativa em 5 anos** (−23,6% do CDI), o que dá uma **perda real de 37%**. O **BrasilPrev Top Multimercado Investimento no Exterior** (23.425.559/0001-69, R$ 946 milhões) ficou em 31% do CDI em 5 anos e também perdeu da inflação (−2,0% real).
> Atenção: são fundos de risco, com exposição ao exterior, e nos últimos 12 e 36 meses foram bem (acima do CDI). Usar apenas como exemplo de "produto vendido como previdência que ficou 5 anos andando para trás em termos reais", não como exemplo de taxa.

---

## 5. Taxa de carregamento: o que os dados atuais mostram

**Fonte:** SES/SUSEP, base completa atualizada em 16/11/2026 (demonstração de resultado das seguradoras, quadro 23). Linhas usadas: *Prêmios VGBL* (7179), *Receitas de contribuições e prêmios de VGBL* (7186, ou seja, o que a seguradora retém do aporte, que é essencialmente o carregamento) e *Rendas com taxa de gestão e outras taxas* (6238).

**a) Carregamento na entrada: praticamente extinto nos aportes novos**

| Período | Aportes em VGBL | Carregamento retido | Taxa efetiva média |
|---|---|---|---|
| 2025 (ano) | R$ 139,3 bi | R$ 83,5 mi | **0,06%** |
| 2026 (jan–set) | R$ 105,4 bi | R$ 48,3 mi | **0,05%** |

Por seguradora em 2025 (VGBL): BrasilPrev 0,037% (R$ 15,5 mi sobre R$ 42 bi), Bradesco 0,022%, Itaú 0,007%, Caixa 0,003%. XP, BTG, Safra e Zurich Santander tiveram zero.

**b) O custo que realmente pesa: taxa de gestão**

| Período | Receita com taxa de gestão e outras taxas (todas as seguradoras) |
|---|---|
| 2025 (ano) | **R$ 8,46 bi** |
| 2026 (jan–set) | R$ 7,12 bi |

Principais em 2025: BrasilPrev R$ 3,87 bi · Caixa R$ 1,94 bi · Bradesco R$ 1,16 bi · Itaú R$ 459 mi · Zurich Santander R$ 329 mi · XP R$ 285 mi.

> Em 2025, a taxa de gestão rendeu às seguradoras cerca de **100 vezes mais** que o carregamento.

**c) Carregamento na saída (postecipado): continua permitido e existe**
- A Circular SUSEP 699/2024 permite carregamento cobrado no resgate ou na portabilidade, desde que previsto no regulamento.
- Exemplo em plano registrado na SUSEP (PGBL individual da Caixa Vida e Previdência, processo 15414.005445/2011-52): **1,5% até o 12º mês, 1,0% do 13º ao 24º, 0,5% do 25º ao 36º e zero depois do 36º mês**, cobrado no resgate e/ou na portabilidade. Isso bate com a reclamação no Reclame Aqui sobre "reter o dinheiro por três anos". [Registro SUSEP](https://www2.susep.gov.br/safe/menumercado/PVGBL/Plano.aspx/Imprimir?q=uHuIpEzNRQebjbEQxg3TGBP2AWWgUgWq)
- O teto regulatório de carregamento é de **10%** ([SUSEP](https://www.gov.br/susep/pt-br/assuntos/meu-futuro-seguro/seguros-previdencia-e-capitalizacao/providencia-complementar-aberta/pgbl-vgbl)).

**d) Limites desta análise**
- Os números da SUSEP são agregados por seguradora. Eles **não mostram planos antigos específicos** que ainda cobram carregamento sobre contribuições mensais, nem quanto foi cobrado na saída. Para casos individuais, o caminho é o regulamento do plano (consulta pelo número do processo SUSEP) ou o extrato do cliente.
- A taxa de gestão do quadro 23 inclui "outras taxas", mas na previdência ela é composta basicamente pela taxa de administração.
- O caso de 10% de carregamento na saída da MAG vem só do relato no Reclame Aqui. Não encontrei o regulamento que confirme. Usar apenas como relato.

**Recomendação para o vídeo:** não tratar o carregamento como o vilão principal de hoje. A mensagem mais forte e defensável é esta: *o carregamento de entrada quase acabou nos planos novos, mas ainda prende quem está em plano antigo ou tem carregamento de saída. E o custo que mais pesa hoje é a taxa de administração.*

---

## 6. Metodologia e cuidados (ler antes de publicar)

1. **Rentabilidade da cota, já líquida da taxa de administração** do fundo. **Não inclui** taxa de carregamento nem IR, ou seja, o resultado para o participante pode ser ainda pior se houver carregamento.
2. **Recorte justo:** a lista principal só tem fundos conservadores **pós-fixados**, que deveriam acompanhar o CDI. Ficaram de fora fundos de inflação, IMA-B, NTN-B e data-alvo: eles também aparecem muito abaixo do CDI em 5 anos (alguns com 40–55%), mas o motivo principal é a alta dos juros, que derrubou o preço dos títulos longos, e não a taxa. Usá-los seria injusto e daria margem a contestação.
3. **Taxas de administração:** tiradas do último extrato de informações enviado à CVM (2025/2026) ou, na falta dele, do histórico cadastral. Alguns fundos com rentabilidade baixa mostram taxa registrada muito pequena (por exemplo, Unibanco Prever I Fix 100 e Itaú Flexprev Special, com 0,05%). Nesses casos a cobrança provavelmente acontece em outra camada do plano, e por isso **ficaram fora dos destaques**.
4. **Patrimônio e cotistas:** em previdência, o cotista formal do fundo é a seguradora. Por isso a CVM mostra 1 cotista, e o número real de participantes não é público por essa base. O patrimônio é o valor oficial em 17/11/2026.
5. **Fundos antigos:** vários desses fundos são de planos antigos e podem estar fechados para novos clientes. Isso **reforça a mensagem**: são clientes que entraram anos atrás e continuam pagando caro sem saber.
6. **Linguagem no vídeo:** apresentar como *"dados públicos da CVM"*, com CNPJ e data na tela. Evitar adjetivos sobre as instituições. Sugestão de rodapé: *"Fonte: CVM e Banco Central. Rentabilidade passada não garante rentabilidade futura. Dados até 17/11/2026."*
7. **Reprodutível:** os números podem ser refeitos por qualquer pessoa com as bases abertas da CVM (dados.cvm.gov.br, INF_DIARIO, registro_fundo_classe e EXTRATO).
