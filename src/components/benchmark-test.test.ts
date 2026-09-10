import { describe, expect, it } from "vitest";
import {
	getBenchmarkPassages,
} from "../data/benchmark-passages.js";
import { tokenize } from "../services/rsvp-engine.js";
import { computeWpm, pickPassageForLocale } from "./benchmark-test.js";

/**
 * Estes testes cobrem dois defeitos que passaram por 3 tentativas de tradução
 * sem serem notados, porque `tsc` e a suíte existente não olhavam para eles:
 *
 *   1. as 5 passagens pt-BR existiam no arquivo de dados mas eram inalcançáveis
 *      pela interface (o componente chamava `pickPassage()`, que só vê o inglês);
 *   2. o WPM dividia pelo `wordCount` declarado, que nas passagens inglesas
 *      herdadas do upstream está errado — inflando o resultado em até 5,8%.
 */

const EN = getBenchmarkPassages("en");
const PT = getBenchmarkPassages("pt-BR");

describe("pickPassageForLocale", () => {
	it("devolve texto pt-BR quando o locale é pt-BR", () => {
		const ptTexts = new Set(PT.map((p) => p.text));
		// os ids são iguais entre os locales, então a prova é o texto, não o id
		for (let i = 0; i < 50; i++) {
			expect(ptTexts.has(pickPassageForLocale("pt-BR").text)).toBe(true);
		}
	});

	it("devolve texto inglês quando o locale é en", () => {
		const enTexts = new Set(EN.map((p) => p.text));
		for (let i = 0; i < 50; i++) {
			expect(enTexts.has(pickPassageForLocale("en").text)).toBe(true);
		}
	});

	it("cai para o inglês em locale desconhecido, em vez de devolver vazio", () => {
		const enTexts = new Set(EN.map((p) => p.text));
		expect(enTexts.has(pickPassageForLocale("xx" as never).text)).toBe(true);
	});

	it("respeita o id excluído", () => {
		expect(pickPassageForLocale("pt-BR", "deep-ocean").id).not.toBe(
			"deep-ocean",
		);
	});

	it("nunca devolve undefined", () => {
		for (const locale of ["pt-BR", "en"] as const) {
			expect(pickPassageForLocale(locale)).toBeTypeOf("object");
		}
	});

	it("as passagens pt-BR não são iguais às inglesas", () => {
		// se alguém fizer o array pt-BR apontar para o inglês, este teste cai
		const ptTexts = PT.map((p) => p.text);
		const enTexts = EN.map((p) => p.text);
		expect(ptTexts).not.toEqual(enTexts);
	});
});

describe("computeWpm", () => {
	it("usa o tokenizador como denominador, não o wordCount declarado", () => {
		for (const p of [...EN, ...PT]) {
			// 60_000 ms = exatamente 1 minuto, então o WPM é o nº de tokens
			expect(computeWpm(p.text, 60_000)).toBe(tokenize(p.text).length);
		}
	});

	it("não herda o desvio de wordCount das passagens inglesas do upstream", () => {
		const sleep = EN.find((p) => p.id === "sleep-science");
		expect(sleep).toBeDefined();
		if (!sleep) return;

		const measured = computeWpm(sleep.text, 60_000);
		expect(measured).toBe(291);
		// o dado declarado continua errado de propósito: mexer nele criaria
		// conflito em todo merge com o upstream
		expect(sleep.wordCount).toBe(308);
		expect(measured).not.toBe(sleep.wordCount);
	});

	it("respeita o intervalo mínimo de 0,1 minuto", () => {
		const p = PT[0];
		expect(computeWpm(p.text, 0)).toBe(tokenize(p.text).length * 10);
	});

	it("escala linearmente com o tempo", () => {
		const p = PT[0];
		const tokens = tokenize(p.text).length;
		expect(computeWpm(p.text, 30_000)).toBe(tokens * 2);
		expect(computeWpm(p.text, 120_000)).toBe(Math.round(tokens / 2));
	});
});

describe("passagens pt-BR", () => {
	it("cobrem os mesmos ids das inglesas", () => {
		expect(PT.map((p) => p.id).sort()).toEqual(EN.map((p) => p.id).sort());
	});

	it("têm wordCount exato, medido pelo tokenizador", () => {
		for (const p of PT) {
			expect(p.wordCount).toBe(tokenize(p.text).length);
		}
	});

	it("têm 10 perguntas com índice correct válido", () => {
		for (const p of PT) {
			expect(p.questions).toHaveLength(10);
			for (const q of p.questions) {
				expect(q.correct).toBeGreaterThanOrEqual(0);
				expect(q.correct).toBeLessThan(q.options.length);
			}
		}
	});
});
