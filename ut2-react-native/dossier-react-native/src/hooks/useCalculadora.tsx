import { useState } from 'react';

export type Operacion = '+' | '-' | '×' | '÷' | null;

export function useCalculadora() {
  const [actual, setActual] = useState('0');
  const [anterior, setAnterior] = useState<string | null>(null);
  const [operacion, setOperacion] = useState<Operacion>(null);
  const [reiniciarVisor, setReiniciarVisor] = useState(false);

  const pulsarNumero = (num: string) => {
    if (reiniciarVisor) {
      setActual(num);
      setReiniciarVisor(false);
      return;
    }

    if (num === '.' && actual.includes('.')) return;

    if (actual === '0' && num !== '.') {
      setActual(num);
    } else {
      setActual(actual + num);
    }
  };

  const limpiar = () => {
    setActual('0');
    setAnterior(null);
    setOperacion(null);
    setReiniciarVisor(false);
  };

  const borrarUltimo = () => {
    if (reiniciarVisor) return;
    if (actual.length === 1 || (actual.length === 2 && actual.startsWith('-'))) {
      setActual('0');
    } else {
      setActual(actual.slice(0, -1));
    }
  };

  const cambiarSigno = () => {
    if (actual === '0') return;
    setActual(actual.startsWith('-') ? actual.slice(1) : '-' + actual);
  };

  const calcularResultado = (a: number, b: number, op: Operacion): string => {
    switch (op) {
      case '+':
        return String(a + b);
      case '-':
        return String(a - b);
      case '×':
        return String(a * b);
      case '÷':
        return b === 0 ? 'Error' : String(Number((a / b).toFixed(6)));
      default:
        return String(b);
    }
  };

  const seleccionarOperacion = (op: Operacion) => {
    if (anterior !== null && operacion && !reiniciarVisor) {
      const resultado = calcularResultado(Number(anterior), Number(actual), operacion);
      setActual(resultado);
      setAnterior(resultado === 'Error' ? null : resultado);
    } else {
      setAnterior(actual);
    }
    setOperacion(op);
    setReiniciarVisor(true);
  };

  const pulsarIgual = () => {
    if (anterior === null || !operacion) return;
    const resultado = calcularResultado(Number(anterior), Number(actual), operacion);
    setActual(resultado);
    setAnterior(null);
    setOperacion(null);
    setReiniciarVisor(true);
  };

  return {
    actual,
    anterior,
    operacion,
    pulsarNumero,
    limpiar,
    borrarUltimo,
    cambiarSigno,
    seleccionarOperacion,
    pulsarIgual,
  };
}
