// Exemplo de otimização para a função listarCriancasParaCoordenador
// Esta função deve ser implementada no seu backend

listarCriancasParaCoordenador: async (): Promise<Child[]> => {
  return prisma.child.findMany({
    where: { isPending: true },
    select: {
      // Campos básicos da criança
      id: true,
      name: true,
      nis: true,
      birth_date: true,
      address: true,
      sex: true,
      isBpc: true,
      isPending: true,
      createdAt: true,
      updatedAt: true,
      
      // Caregiver - incluir apenas o name (conforme solicitado)
      caregiver: {
        select: {
          id: true,
          name: true,
        }
      },
      
      // Visitor - incluir apenas o name (conforme solicitado)  
      visitor: {
        select: {
          id: true,
          name: true,
        }
      },
      
      // Para os demais relacionamentos, incluir apenas a contagem
      _count: {
        select: {
          visitPlans: true,
          geoLocatedVisits: true,
        }
      }
    },
  });
},

// Alternativa usando agregação para melhor performance:
listarCriancasParaCoordenadorOtimizada: async (): Promise<any[]> => {
  return prisma.child.findMany({
    where: { isPending: true },
    select: {
      id: true,
      name: true,
      nis: true,
      birth_date: true,
      address: true,
      sex: true,
      isBpc: true,
      isPending: true,
      createdAt: true,
      updatedAt: true,
      
      // Apenas name do caregiver
      caregiver: {
        select: {
          id: true,
          name: true,
        }
      },
      
      // Apenas name do visitador
      visitor: {
        select: {
          id: true,
          name: true,
        }
      }
    },
    // Usar _count para contar relacionamentos sem carregar todos os dados
    include: {
      _count: {
        select: {
          visitPlans: true,
          geoLocatedVisits: true,
        }
      }
    }
  });
}

/* 
BENEFÍCIOS DESTA OTIMIZAÇÃO:

1. PERFORMANCE:
   - Reduz drasticamente o tamanho dos dados transferidos
   - Diminui o tempo de consulta no banco
   - Melhora a velocidade de carregamento da página

2. ESTRUTURA DE DADOS RETORNADA:
   {
     id: 1,
     name: "João Silva",
     nis: "12345678901",
     birth_date: "2015-05-10",
     address: "Rua das Flores, 123",
     sex: "Masculino",
     isBpc: false,
     isPending: true,
     caregiver: {
       id: 5,
       name: "Maria Silva"
     },
     visitor: {
       id: 3,
       name: "Ana Santos"
     },
     _count: {
       visitPlans: 5,
       geoLocatedVisits: 12
     }
   }

3. USO NO FRONTEND:
   - crianca.caregiver.name (nome do cuidador)
   - crianca.visitor.name (nome do visitador)
   - crianca._count.visitPlans (quantidade de planos)
   - crianca._count.geoLocatedVisits (quantidade de visitas)

4. COMPATIBILIDADE:
   - Mantém compatibilidade com o código atual do frontend
   - Apenas adiciona as contagens como propriedades extras
   - Não quebra a funcionalidade existente
*/