package br.com.clincanet.web.rest;

import br.com.clincanet.ClinicaNetApp;

import br.com.clincanet.domain.Paciente;
import br.com.clincanet.repository.PacienteRepository;
import br.com.clincanet.service.PacienteService;
import br.com.clincanet.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static br.com.clincanet.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.clincanet.domain.enumeration.EstadoCivil;
/**
 * Test class for the PacienteResource REST controller.
 *
 * @see PacienteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ClinicaNetApp.class)
public class PacienteResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_CPF = "AAAAAAAAAA";
    private static final String UPDATED_CPF = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA_NASCIMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_NASCIMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_SEXO = "AAAAAAAAAA";
    private static final String UPDATED_SEXO = "BBBBBBBBBB";

    private static final EstadoCivil DEFAULT_ESTADO_CIVIL = EstadoCivil.CASADO;
    private static final EstadoCivil UPDATED_ESTADO_CIVIL = EstadoCivil.SOLTEIRO;

    private static final String DEFAULT_ENDERECO = "AAAAAAAAAA";
    private static final String UPDATED_ENDERECO = "BBBBBBBBBB";

    private static final String DEFAULT_NATURALIDADE = "AAAAAAAAAA";
    private static final String UPDATED_NATURALIDADE = "BBBBBBBBBB";

    @Autowired
    private PacienteRepository pacienteRepository;

    

    @Autowired
    private PacienteService pacienteService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPacienteMockMvc;

    private Paciente paciente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PacienteResource pacienteResource = new PacienteResource(pacienteService);
        this.restPacienteMockMvc = MockMvcBuilders.standaloneSetup(pacienteResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Paciente createEntity(EntityManager em) {
        Paciente paciente = new Paciente()
            .nome(DEFAULT_NOME)
            .cpf(DEFAULT_CPF)
            .dataNascimento(DEFAULT_DATA_NASCIMENTO)
            .sexo(DEFAULT_SEXO)
            .estadoCivil(DEFAULT_ESTADO_CIVIL)
            .endereco(DEFAULT_ENDERECO)
            .naturalidade(DEFAULT_NATURALIDADE);
        return paciente;
    }

    @Before
    public void initTest() {
        paciente = createEntity(em);
    }

    @Test
    @Transactional
    public void createPaciente() throws Exception {
        int databaseSizeBeforeCreate = pacienteRepository.findAll().size();

        // Create the Paciente
        restPacienteMockMvc.perform(post("/api/pacientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paciente)))
            .andExpect(status().isCreated());

        // Validate the Paciente in the database
        List<Paciente> pacienteList = pacienteRepository.findAll();
        assertThat(pacienteList).hasSize(databaseSizeBeforeCreate + 1);
        Paciente testPaciente = pacienteList.get(pacienteList.size() - 1);
        assertThat(testPaciente.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testPaciente.getCpf()).isEqualTo(DEFAULT_CPF);
        assertThat(testPaciente.getDataNascimento()).isEqualTo(DEFAULT_DATA_NASCIMENTO);
        assertThat(testPaciente.getSexo()).isEqualTo(DEFAULT_SEXO);
        assertThat(testPaciente.getEstadoCivil()).isEqualTo(DEFAULT_ESTADO_CIVIL);
        assertThat(testPaciente.getEndereco()).isEqualTo(DEFAULT_ENDERECO);
        assertThat(testPaciente.getNaturalidade()).isEqualTo(DEFAULT_NATURALIDADE);
    }

    @Test
    @Transactional
    public void createPacienteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pacienteRepository.findAll().size();

        // Create the Paciente with an existing ID
        paciente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPacienteMockMvc.perform(post("/api/pacientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paciente)))
            .andExpect(status().isBadRequest());

        // Validate the Paciente in the database
        List<Paciente> pacienteList = pacienteRepository.findAll();
        assertThat(pacienteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPacientes() throws Exception {
        // Initialize the database
        pacienteRepository.saveAndFlush(paciente);

        // Get all the pacienteList
        restPacienteMockMvc.perform(get("/api/pacientes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paciente.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].cpf").value(hasItem(DEFAULT_CPF.toString())))
            .andExpect(jsonPath("$.[*].dataNascimento").value(hasItem(DEFAULT_DATA_NASCIMENTO.toString())))
            .andExpect(jsonPath("$.[*].sexo").value(hasItem(DEFAULT_SEXO.toString())))
            .andExpect(jsonPath("$.[*].estadoCivil").value(hasItem(DEFAULT_ESTADO_CIVIL.toString())))
            .andExpect(jsonPath("$.[*].endereco").value(hasItem(DEFAULT_ENDERECO.toString())))
            .andExpect(jsonPath("$.[*].naturalidade").value(hasItem(DEFAULT_NATURALIDADE.toString())));
    }
    

    @Test
    @Transactional
    public void getPaciente() throws Exception {
        // Initialize the database
        pacienteRepository.saveAndFlush(paciente);

        // Get the paciente
        restPacienteMockMvc.perform(get("/api/pacientes/{id}", paciente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(paciente.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.cpf").value(DEFAULT_CPF.toString()))
            .andExpect(jsonPath("$.dataNascimento").value(DEFAULT_DATA_NASCIMENTO.toString()))
            .andExpect(jsonPath("$.sexo").value(DEFAULT_SEXO.toString()))
            .andExpect(jsonPath("$.estadoCivil").value(DEFAULT_ESTADO_CIVIL.toString()))
            .andExpect(jsonPath("$.endereco").value(DEFAULT_ENDERECO.toString()))
            .andExpect(jsonPath("$.naturalidade").value(DEFAULT_NATURALIDADE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingPaciente() throws Exception {
        // Get the paciente
        restPacienteMockMvc.perform(get("/api/pacientes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePaciente() throws Exception {
        // Initialize the database
        pacienteService.save(paciente);

        int databaseSizeBeforeUpdate = pacienteRepository.findAll().size();

        // Update the paciente
        Paciente updatedPaciente = pacienteRepository.findById(paciente.getId()).get();
        // Disconnect from session so that the updates on updatedPaciente are not directly saved in db
        em.detach(updatedPaciente);
        updatedPaciente
            .nome(UPDATED_NOME)
            .cpf(UPDATED_CPF)
            .dataNascimento(UPDATED_DATA_NASCIMENTO)
            .sexo(UPDATED_SEXO)
            .estadoCivil(UPDATED_ESTADO_CIVIL)
            .endereco(UPDATED_ENDERECO)
            .naturalidade(UPDATED_NATURALIDADE);

        restPacienteMockMvc.perform(put("/api/pacientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPaciente)))
            .andExpect(status().isOk());

        // Validate the Paciente in the database
        List<Paciente> pacienteList = pacienteRepository.findAll();
        assertThat(pacienteList).hasSize(databaseSizeBeforeUpdate);
        Paciente testPaciente = pacienteList.get(pacienteList.size() - 1);
        assertThat(testPaciente.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testPaciente.getCpf()).isEqualTo(UPDATED_CPF);
        assertThat(testPaciente.getDataNascimento()).isEqualTo(UPDATED_DATA_NASCIMENTO);
        assertThat(testPaciente.getSexo()).isEqualTo(UPDATED_SEXO);
        assertThat(testPaciente.getEstadoCivil()).isEqualTo(UPDATED_ESTADO_CIVIL);
        assertThat(testPaciente.getEndereco()).isEqualTo(UPDATED_ENDERECO);
        assertThat(testPaciente.getNaturalidade()).isEqualTo(UPDATED_NATURALIDADE);
    }

    @Test
    @Transactional
    public void updateNonExistingPaciente() throws Exception {
        int databaseSizeBeforeUpdate = pacienteRepository.findAll().size();

        // Create the Paciente

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPacienteMockMvc.perform(put("/api/pacientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paciente)))
            .andExpect(status().isBadRequest());

        // Validate the Paciente in the database
        List<Paciente> pacienteList = pacienteRepository.findAll();
        assertThat(pacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePaciente() throws Exception {
        // Initialize the database
        pacienteService.save(paciente);

        int databaseSizeBeforeDelete = pacienteRepository.findAll().size();

        // Get the paciente
        restPacienteMockMvc.perform(delete("/api/pacientes/{id}", paciente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Paciente> pacienteList = pacienteRepository.findAll();
        assertThat(pacienteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Paciente.class);
        Paciente paciente1 = new Paciente();
        paciente1.setId(1L);
        Paciente paciente2 = new Paciente();
        paciente2.setId(paciente1.getId());
        assertThat(paciente1).isEqualTo(paciente2);
        paciente2.setId(2L);
        assertThat(paciente1).isNotEqualTo(paciente2);
        paciente1.setId(null);
        assertThat(paciente1).isNotEqualTo(paciente2);
    }
}
