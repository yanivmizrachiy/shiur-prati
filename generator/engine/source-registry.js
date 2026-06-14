// generator/engine/source-registry.js
// Single source of truth mapping every question-producing engine and topic id to
// its origin among the 10 intake PDFs. Mapping is grounded in
// docs/SOURCE_ALIGNMENT.md, the source-learning notes, and PATTERN_INDEX.md.
// Loaded after source-schema.js. Both runtime (E.getSource) and the static
// verify-source-lock.mjs read these entries.
(function () {
  const E = window.TargilimEngine = window.TargilimEngine || {};
  if (typeof E.defineSource !== 'function') return; // schema must load first

  const F = {
    a7: '01_grade-7_algebra_curriculum.pdf',
    a8: '02_grade-8_algebra_curriculum.pdf',
    g7: '03_grade-7_pre_deductive_geometry_curriculum.pdf',
    g8: '04_grade-8_geometry_curriculum.pdf',
    n7: '05_grade-7_numeric_domain_curriculum.pdf',
    unc: '06_uncertainty_domain_curriculum_examples.pdf',
    n8: '07_numeric_domain_principles_grades-7-8.pdf'
  };

  // [id, sourceFile, grade, domain, skill, demand, fallback?]
  const ROWS = [
    // ── 25 core pilot engines ──
    ['G7-01-ENGINE', F.g7, 7, 'geometry', 'rectangle_box_area_perimeter_volume', 'standard'],
    ['G7-02-ENGINE', F.g7, 7, 'geometry', 'plane_shape_area', 'standard'],
    ['G7-03-ENGINE', F.g7, 7, 'geometry', 'pythagoras', 'standard'],
    ['G7-04-ENGINE', F.g7, 7, 'geometry', 'triangle_angle_sum', 'standard'],
    ['N7-03-ENGINE', F.n7, 7, 'numeric', 'negative_numbers_number_line', 'basic'],
    ['N7-04-ENGINE', F.n7, 7, 'numeric', 'directed_add_sub', 'standard'],
    ['N7-05-ENGINE', F.n7, 7, 'numeric', 'directed_mul_div', 'standard'],
    ['N7-06-ENGINE', F.n7, 7, 'numeric', 'powers_sign', 'standard'],
    ['N7-07-ENGINE', F.n7, 7, 'numeric', 'square_root', 'standard'],
    ['A7-01-ENGINE', F.a7, 7, 'algebra', 'algebraic_expressions', 'standard'],
    ['A7-02-ENGINE', F.a7, 7, 'algebra', 'substitution_in_expression', 'standard'],
    ['A7-03-ENGINE', F.a7, 7, 'algebra', 'first_degree_equations', 'standard'],
    ['U7-01-ENGINE', F.unc, 7, 'uncertainty', 'frequency_table_and_bar_chart', 'standard'],
    ['U7-02-ENGINE', F.unc, 7, 'uncertainty', 'basic_probability', 'standard'],
    ['G8-01-ENGINE', F.g8, 8, 'geometry', 'circle_circumference_area', 'standard'],
    ['G8-04-ENGINE', F.g8, 8, 'geometry', 'triangle_similarity', 'standard'],
    ['N8-01-ENGINE', F.n8, 8, 'numeric', 'ratio', 'standard'],
    ['N8-02-ENGINE', F.n8, 8, 'numeric', 'proportion', 'standard'],
    ['N8-03-ENGINE', F.n8, 8, 'numeric', 'scale', 'standard'],
    ['N8-04-ENGINE', F.n8, 8, 'numeric', 'percent_static', 'standard'],
    ['N8-05-ENGINE', F.n8, 8, 'numeric', 'percent_dynamic', 'challenge'],
    ['A8-02-ENGINE', F.a8, 8, 'algebra', 'slope_and_linear_equation', 'standard'],
    ['A8-03-ENGINE', F.a8, 8, 'algebra', 'systems_of_equations', 'challenge'],
    ['U8-01-ENGINE', F.unc, 8, 'uncertainty', 'mean_median_range', 'standard'],
    ['U8-02-ENGINE', F.unc, 8, 'uncertainty', 'probability_from_table', 'standard'],

    // ── loaded source-fit engines ──
    ['N7-01-ENGINE', F.n7, 7, 'numeric', 'coordinate_system_quadrant_1', 'standard'],
    ['U7-03-ENGINE', F.unc, 7, 'uncertainty', 'compare_groups_relative_frequency', 'challenge'],
    ['A8-01-ENGINE', F.a8, 8, 'algebra', 'applied_graph_function_reading', 'standard'],
    ['U7-04-ENGINE', F.unc, 7, 'uncertainty', 'bar_chart_reading', 'basic'],
    ['G8-02-ENGINE', F.g8, 8, 'geometry', 'cylinder_and_net', 'standard'],
    ['G8-03-ENGINE', F.g8, 8, 'geometry', 'parallel_line_angles', 'standard'],
    ['A7-04-ENGINE', F.a7, 7, 'algebra', 'equivalent_expressions', 'standard'],
    ['A7-05-ENGINE', F.a7, 7, 'algebra', 'expression_mistake_analysis', 'challenge'],

    // ── logical fallback topics (registered in legacy files, generic handler).
    //    Each carries real source metadata + fallback flag + reason. ──
    // ── converted: all 17 former fallbacks now dedicated source-backed engines ──
    ['U7-05-ENGINE', F.unc, 7, 'uncertainty', 'pie_chart_and_relative_frequency', 'standard'],
    ['U7-06-ENGINE', F.unc, 7, 'uncertainty', 'misleading_graph_critique', 'challenge'],
    ['U7-07-ENGINE', F.unc, 7, 'uncertainty', 'frequency_table_and_relative_frequency', 'standard'],
    ['U7-08-ENGINE', F.unc, 7, 'uncertainty', 'mean_median_range', 'standard'],
    ['G8-06-ENGINE', F.g8, 8, 'geometry', 'diameter_radius_chord', 'standard'],
    ['G8-08-ENGINE', F.g8, 8, 'geometry', 'isosceles_triangle', 'standard'],
    ['N7-08-ENGINE', F.n7, 7, 'numeric', 'number_line_comparison', 'basic'],
    ['N7-09-ENGINE', F.n7, 7, 'numeric', 'opposite_and_absolute_value', 'standard'],
    ['G8-05-ENGINE', F.g8, 8, 'geometry', 'central_angle_and_sector', 'standard'],
    ['G8-07-ENGINE', F.g8, 8, 'geometry', 'triangle_congruence_markings', 'challenge'],
    ['G8-09-ENGINE', F.g8, 8, 'geometry', 'similarity_and_shadows', 'challenge'],
    ['G7-06-ENGINE', F.g7, 7, 'geometry', 'composite_area', 'challenge'],
    ['G7-05-ENGINE', F.g7, 7, 'geometry', 'transformations', 'standard'],
    ['N7-10-ENGINE', F.n7, 7, 'numeric', 'directed_add_sub_mistake_analysis', 'standard'],
    ['N7-11-ENGINE', F.n7, 7, 'numeric', 'directed_add_sub_context', 'standard'],
    ['N7-12-ENGINE', F.n7, 7, 'numeric', 'directed_mul_div_mistake_analysis', 'standard'],
    ['N7-13-ENGINE', F.n7, 7, 'numeric', 'directed_mul_div_sign_rules', 'standard']
  ];

  ROWS.forEach(function (r) {
    const meta = {
      sourceFile: r[1],
      sourceId: String(r[0]).replace(/-ENGINE$/, ''),
      patternId: String(r[0]).replace(/-ENGINE$/, '') + '-' + r[4],
      grade: r[2],
      domain: r[3],
      skill: r[4],
      curriculumArea: r[3] + ' / grade ' + r[2],
      cognitiveDemand: r[5]
    };
    if (r[6]) { meta.fallback = true; meta.fallbackReason = r[6]; }
    E.defineSource(r[0], meta);
  });
})();
