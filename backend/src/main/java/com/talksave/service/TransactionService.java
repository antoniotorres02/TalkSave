package com.talksave.service;

import com.talksave.dto.TransactionDTO;
import com.talksave.entity.Transaction;
import com.talksave.entity.User;
import com.talksave.exception.ResourceNotFoundException;
import com.talksave.repository.TransactionRepository;
import com.talksave.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    @Transactional
    public TransactionDTO createTransaction(TransactionDTO transactionDTO) {
        User user = userRepository.findById(transactionDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Transaction transaction = Transaction.builder()
                .amount(transactionDTO.getAmount())
                .type(transactionDTO.getType())
                .description(transactionDTO.getDescription())
                .transactionDate(LocalDateTime.now())
                .user(user)
                .build();

        transaction = transactionRepository.save(transaction);

        return mapToDTO(transaction);
    }

    public TransactionDTO getTransactionById(Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
        return mapToDTO(transaction);
    }

    private TransactionDTO mapToDTO(Transaction transaction) {
        return TransactionDTO.builder()
                .id(transaction.getId())
                .amount(transaction.getAmount())
                .type(transaction.getType())
                .description(transaction.getDescription())
                .transactionDate(transaction.getTransactionDate())
                .userId(transaction.getUser().getId())
                .build();
    }
}
